package billing

import (
	"bytes"
	"crypto/hmac"
	"crypto/sha512"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

// PaystackProvider implements PaymentProvider using the Paystack API.
// Used for IDR and potentially MYR markets where Paystack has better coverage.
type PaystackProvider struct {
	secretKey      string
	webhookSecret  string
	pricingService *PricingService
}

func NewPaystackProvider(secret, webhookSecret string, ps *PricingService) *PaystackProvider {
	return &PaystackProvider{
		secretKey:      secret,
		webhookSecret:  webhookSecret,
		pricingService: ps,
	}
}

// paystackAmounts maps plan+currency to the smallest currency unit (e.g. kobo for NGN).
// For IDR: multiply by 100 (Paystack uses subunits).
var paystackAmounts = map[string]map[PlanType]int64{
	"IDR": {
		PlanPro:       4900_00,   // IDR 4,900 in sen
		PlanMax:       11900_00,  // IDR 11,900
		PlanUnlimited: 49900_00,  // IDR 49,900
	},
}

func (p *PaystackProvider) getAmountForPlan(plan PlanType, currency string) int64 {
	if amounts, ok := paystackAmounts[currency]; ok {
		if amount, ok := amounts[plan]; ok {
			return amount
		}
	}
	// Fallback — should not happen in production
	return 100_00
}

// CreateCheckoutSession calls Paystack's /transaction/initialize endpoint
// and returns the authorization_url to redirect the user to.
func (p *PaystackProvider) CreateCheckoutSession(userID string, plan PlanType, currency string) (string, error) {
	reference := fmt.Sprintf("%s-%s-%d", userID, plan, time.Now().Unix())

	body, err := json.Marshal(map[string]interface{}{
		"email":    userID, // Paystack uses email as the customer reference
		"amount":   p.getAmountForPlan(plan, currency),
		"currency": currency,
		"reference": reference,
		"metadata": map[string]string{
			"user_id": userID,
			"plan":    string(plan),
		},
	})
	if err != nil {
		return "", fmt.Errorf("failed to marshal paystack request: %v", err)
	}

	req, err := http.NewRequest("POST", "https://api.paystack.co/transaction/initialize", bytes.NewBuffer(body))
	if err != nil {
		return "", err
	}
	req.Header.Set("Authorization", "Bearer "+p.secretKey)
	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", fmt.Errorf("paystack API request failed: %v", err)
	}
	defer resp.Body.Close()

	var result struct {
		Status  bool   `json:"status"`
		Message string `json:"message"`
		Data    struct {
			AuthorizationURL string `json:"authorization_url"`
		} `json:"data"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return "", fmt.Errorf("failed to decode paystack response: %v", err)
	}
	if !result.Status {
		return "", fmt.Errorf("paystack error: %s", result.Message)
	}
	return result.Data.AuthorizationURL, nil
}

// ProcessWebhookEvent verifies the Paystack webhook signature and parses the event.
func (p *PaystackProvider) ProcessWebhookEvent(req *http.Request) (*BillingEvent, error) {
	body, err := io.ReadAll(req.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read webhook body: %v", err)
	}

	// Verify HMAC-SHA512 signature
	sig := req.Header.Get("X-Paystack-Signature")
	mac := hmac.New(sha512.New, []byte(p.webhookSecret))
	mac.Write(body)
	expected := hex.EncodeToString(mac.Sum(nil))
	if sig != expected {
		return nil, fmt.Errorf("invalid paystack webhook signature")
	}

	var event struct {
		Event string `json:"event"`
		Data  struct {
			Reference string `json:"reference"`
			Status    string `json:"status"`
			Metadata  struct {
				UserID string `json:"user_id"`
				Plan   string `json:"plan"`
			} `json:"metadata"`
		} `json:"data"`
	}
	if err := json.Unmarshal(body, &event); err != nil {
		return nil, fmt.Errorf("failed to parse paystack event: %v", err)
	}

	if event.Event != "charge.success" || event.Data.Status != "success" {
		return &BillingEvent{IsActive: false}, nil
	}

	return &BillingEvent{
		UserID:   event.Data.Metadata.UserID,
		Plan:     PlanType(event.Data.Metadata.Plan),
		IsActive: true,
	}, nil
}
