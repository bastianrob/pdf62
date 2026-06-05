package billing

import "net/http"

type PlanType string

const (
	PlanPro       PlanType = "PRO"
	PlanMax       PlanType = "MAX"
	PlanUnlimited PlanType = "UNLIMITED"
)

type BillingEvent struct {
	UserID     string
	Plan       PlanType
	IsActive   bool
	RawPayload []byte
}

type PaymentProvider interface {
	CreateCheckoutSession(userID string, plan PlanType, currency string) (string, error)
	ProcessWebhookEvent(req *http.Request) (*BillingEvent, error)
}
