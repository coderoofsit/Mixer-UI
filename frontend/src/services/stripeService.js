import apiClient from "./apiService";

export const stripeService = {
	// Create Stripe checkout session
	createCheckoutSession: async (amount, currency, orderId, productType) => {
		try {
			const response = await apiClient.post(
				"/api/v1/stripe/create-checkout-session",
				{
					amount,
					currency,
					orderId,
					productType,
				},
			);
			return response.data;
		} catch (error) {
			console.error("Create Stripe checkout session error:", error);
			throw error;
		}
	},

	// Get Stripe checkout session
	getCheckoutSession: async (sessionId) => {
		try {
			const response = await apiClient.get(
				`/api/v1/stripe/checkout-session/${sessionId}`,
			);
			return response.data;
		} catch (error) {
			console.error("Get Stripe checkout session error:", error);
			throw error;
		}
	},

	// Update Stripe checkout session
	updateCheckoutSession: async (sessionId, data) => {
		try {
			const response = await apiClient.put(
				`/api/v1/stripe/checkout-session/${sessionId}`,
				data,
			);
			return response.data;
		} catch (error) {
			console.error("Update Stripe checkout session error:", error);
			throw error;
		}
	},

	// Get Stripe payment intent
	getPaymentIntent: async (intentId) => {
		try {
			const response = await apiClient.get(
				`/api/v1/stripe/payment-intent/${intentId}`,
			);
			return response.data;
		} catch (error) {
			console.error("Get Stripe payment intent error:", error);
			throw error;
		}
	},
	verifyPaymentInIAP: async (userId, productId, purchaseToken) => {
		try {
			const response = await apiClient.post("/api/v1/iap/verify", {
				userId,
				productId,
				platform: "web",
				purchaseToken,
			});
			return response.data;
		} catch (error) {
			console.error("Verify payment in IAP error:", error);
			throw error;
		}
	},
};
