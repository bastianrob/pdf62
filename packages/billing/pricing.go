package billing

import "fmt"

type PricingService struct {
	// Key: Currency (e.g. "USD", "IDR") -> Value: Map of Plan -> VendorPriceID
	RegionalPriceMap map[string]map[PlanType]string
}

func NewPricingService() *PricingService {
	// Initialize with static PPP mapping referencing pricing.md
	// Replace placeholder price IDs with actual Stripe price IDs once products are created.
	return &PricingService{
		RegionalPriceMap: map[string]map[PlanType]string{
			"USD": {
				PlanPro:       "price_usd_pro_monthly",
				PlanMax:       "price_usd_max_monthly",
				PlanUnlimited: "price_usd_unlimited_lifetime",
			},
			"IDR": {
				PlanPro:       "price_idr_pro_monthly",
				PlanMax:       "price_idr_max_monthly",
				PlanUnlimited: "price_idr_unlimited_lifetime",
			},
			"EUR": {
				PlanPro:       "price_eur_pro_monthly",
				PlanMax:       "price_eur_max_monthly",
				PlanUnlimited: "price_eur_unlimited_lifetime",
			},
			"GBP": {
				PlanPro:       "price_gbp_pro_monthly",
				PlanMax:       "price_gbp_max_monthly",
				PlanUnlimited: "price_gbp_unlimited_lifetime",
			},
			"SGD": {
				PlanPro:       "price_sgd_pro_monthly",
				PlanMax:       "price_sgd_max_monthly",
				PlanUnlimited: "price_sgd_unlimited_lifetime",
			},
			"AUD": {
				PlanPro:       "price_aud_pro_monthly",
				PlanMax:       "price_aud_max_monthly",
				PlanUnlimited: "price_aud_unlimited_lifetime",
			},
			"MYR": {
				PlanPro:       "price_myr_pro_monthly",
				PlanMax:       "price_myr_max_monthly",
				PlanUnlimited: "price_myr_unlimited_lifetime",
			},
			"JPY": {
				PlanPro:       "price_jpy_pro_monthly",
				PlanMax:       "price_jpy_max_monthly",
				PlanUnlimited: "price_jpy_unlimited_lifetime",
			},
			"CHF": {
				PlanPro:       "price_chf_pro_monthly",
				PlanMax:       "price_chf_max_monthly",
				PlanUnlimited: "price_chf_unlimited_lifetime",
			},
		},
	}
}

func (p *PricingService) GetVendorPriceID(plan PlanType, currency string) (string, error) {
	currencyMap, exists := p.RegionalPriceMap[currency]
	if !exists {
		// Fallback to USD
		currencyMap = p.RegionalPriceMap["USD"]
	}

	priceID, exists := currencyMap[plan]
	if !exists {
		return "", fmt.Errorf("plan %s not supported", plan)
	}
	return priceID, nil
}
