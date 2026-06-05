package billing

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	paddle "github.com/PaddleHQ/paddle-go-sdk/v4"
)

type PaddleProvider struct {
	client         *paddle.SDK
	verifier       *paddle.WebhookVerifier
	pricingService *PricingService
}

func NewPaddleProvider(apiKey string, webhookSecret string, ps *PricingService) (*PaddleProvider, error) {
	var options []paddle.Option
	if os.Getenv("PADDLE_USE_SANDBOX") == "true" {
		options = append(options, paddle.WithBaseURL(paddle.SandboxBaseURL))
	}

	client, err := paddle.New(apiKey, options...)
	if err != nil {
		return nil, fmt.Errorf("failed to initialize paddle sdk: %w", err)
	}

	verifier := paddle.NewWebhookVerifier(webhookSecret)

	return &PaddleProvider{
		client:         client,
		verifier:       verifier,
		pricingService: ps,
	}, nil
}

func (p *PaddleProvider) CreateCheckoutSession(userID string, plan PlanType, currency string) (string, error) {
	priceID, err := p.pricingService.GetVendorPriceID(plan, currency)
	if err != nil {
		return "", err
	}

	customData := paddle.CustomData{
		"user_id": userID,
	}

	req := &paddle.CreateTransactionRequest{
		Items: []paddle.CreateTransactionItems{
			*paddle.NewCreateTransactionItemsTransactionItemFromCatalog(&paddle.TransactionItemFromCatalog{
				PriceID:  priceID,
				Quantity: 1,
			}),
		},
		CustomData: customData,
	}

	txn, err := p.client.CreateTransaction(context.Background(), req)
	if err != nil {
		return "", fmt.Errorf("failed to create paddle transaction: %w", err)
	}

	if txn.Checkout == nil || txn.Checkout.URL == nil || *txn.Checkout.URL == "" {
		return "", fmt.Errorf("paddle transaction created but has no checkout URL")
	}

	return *txn.Checkout.URL, nil
}

func (p *PaddleProvider) ProcessWebhookEvent(req *http.Request) (*BillingEvent, error) {
	ok, err := p.verifier.Verify(req)
	if err != nil {
		return nil, fmt.Errorf("paddle webhook verification error: %w", err)
	}
	if !ok {
		return nil, fmt.Errorf("invalid paddle webhook signature")
	}

	bodyBytes, err := io.ReadAll(req.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read webhook body: %w", err)
	}

	var payload struct {
		EventType string `json:"event_type"`
		Data      struct {
			ID         string                 `json:"id"`
			CustomData map[string]interface{} `json:"custom_data"`
			Items      []struct {
				Price struct {
					ID string `json:"id"`
				} `json:"price"`
			} `json:"items"`
		} `json:"data"`
	}

	if err := json.Unmarshal(bodyBytes, &payload); err != nil {
		return nil, fmt.Errorf("failed to parse webhook payload: %w", err)
	}

	if payload.EventType != "transaction.completed" {
		return &BillingEvent{
			IsActive:   false,
			RawPayload: bodyBytes,
		}, nil
	}

	userID, _ := payload.Data.CustomData["user_id"].(string)
	if userID == "" {
		return nil, fmt.Errorf("user_id not found in custom_data of transaction %s", payload.Data.ID)
	}

	if len(payload.Data.Items) == 0 {
		return nil, fmt.Errorf("no items found in transaction %s", payload.Data.ID)
	}

	priceID := payload.Data.Items[0].Price.ID
	plan := p.getPlanByPriceID(priceID)

	return &BillingEvent{
		UserID:     userID,
		Plan:       plan,
		IsActive:   true,
		RawPayload: bodyBytes,
	}, nil
}

func (p *PaddleProvider) getPlanByPriceID(priceID string) PlanType {
	for _, planMap := range p.pricingService.RegionalPriceMap {
		for plan, pid := range planMap {
			if pid == priceID {
				return plan
			}
		}
	}
	return PlanPro
}
