import React, { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../services/authService";
import LandingHeader from "../components/layout/LandingHeader";
import Footer from "../components/layout/Footer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    // Validation
    if (!email || !email.trim()) {
      setError("Please enter your email address.");
      setIsLoading(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    try {
      await authService.resetPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F5F5" }}>
      <LandingHeader />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 lg:max-w-[500px]">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Reset Your Password
            </h2>
            <p className="text-gray-600">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>

          {/* Reset Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {success ? (
              <div className="text-center">
                {/* Success State */}
                <div className="mb-6">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                    <svg
                      className="h-8 w-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Check Your Email
                </h3>
                <p className="text-gray-600 mb-6">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setEmail("");
                    }}
                    className="w-full text-gray-700 bg-gray-100 hover:bg-gray-200 font-semibold py-3 px-4 rounded-2xl transition-all duration-200"
                    style={{ height: "56px" }}
                  >
                    Try Another Email
                  </button>
                  <Link
                    to="/login"
                    className="block w-full text-center font-semibold py-3 px-4 rounded-2xl transition-all duration-200"
                    style={{
                      backgroundColor: "#5D1751",
                      color: "white",
                      height: "56px",
                      lineHeight: "32px",
                    }}
                  >
                    Back to Login
                  </Link>
                </div>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent transition-colors duration-200 bg-white"
                    style={{
                      height: "56px",
                      borderColor: "#D1D5DB",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#5D1751")}
                    onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
                    placeholder="Enter your email"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "#5D1751",
                    height: "56px",
                  }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>

                {/* Back to Login Link */}
                <div className="text-center">
                  <Link
                    to="/login"
                    className="font-medium text-sm"
                    style={{ color: "#5D1751" }}
                  >
                    ← Back to Login
                  </Link>
                </div>
              </form>
            )}
          </div>

          {/* Additional Info */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Remember your password?{" "}
              <Link to="/login" style={{ color: "#5D1751" }} className="font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;

