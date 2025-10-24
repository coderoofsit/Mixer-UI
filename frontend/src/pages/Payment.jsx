import React, { useState } from "react";

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:4242/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 1000, currency: "usd", orderId: "ORD_001" }),
    });
    const { url } = await res.json();
    window.location.href = url; // redirect to Stripe Checkout
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-2xl shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">Checkout</h2>
      <div className="space-y-2 mb-6">
        <p className="text-gray-700">Product: <strong>Pro Subscription</strong></p>
        <p className="text-gray-700">Price: <strong>$10.00</strong></p>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? "Redirecting..." : "Pay Securely"}
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        🔒 Payments processed securely by Stripe
      </p>
    </div>
  );
}
