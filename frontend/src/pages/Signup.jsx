// src/pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { useProfile } from "../contexts/ProfileContext";
import LandingHeader from "../components/layout/LandingHeader";
import Footer from "../components/layout/Footer";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { fetchProfile } = useProfile();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation: Full Name
    // if (!formData.fullName || formData.fullName.trim().length < 2) {
    //   setError("Please enter your full name (at least 2 characters).");
    //   setIsLoading(false);
    //   return;
    // }

    // Validation: Name should not contain special characters
    // const nameRegex = /^[a-zA-Z\s'-]+$/;
    // if (!nameRegex.test(formData.fullName.trim())) {
    //   setError("Name can only contain letters, spaces, hyphens and apostrophes.");
    //   setIsLoading(false);
    //   return;
    // }

    // Validation: Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    // Validation: Password minimum length
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setIsLoading(false);
      return;
    }

    // Validation: Password strength (at least one uppercase, one lowercase, one number)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordRegex.test(formData.password)) {
      setError("Password must contain at least one uppercase letter, one lowercase letter, and one number.");
      setIsLoading(false);
      return;
    }

    // Validation: Passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      // Sanitize inputs before sending
      const sanitizedData = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        confirmPassword: formData.confirmPassword
      };

      await authService.signUpWithEmail(sanitizedData);
      
      // Fetch profile immediately after successful signup
      console.log('✅ Signup successful, fetching profile...');
      await fetchProfile(true); // Force fetch to ensure fresh data
      
      // Redirect new users to onboarding to complete their profile
      navigate("/onboarding/profile-setup");
    } catch (err) {
      console.error('Signup error:', err);
      // Extract only the message, not the full error object
      let errorMessage = "Registration Failed";
      
      if (err?.message) {
        errorMessage = err.message;
        // Remove "Firebase: Error (auth/...)" prefix if present
        errorMessage = errorMessage.replace(/^Firebase:\s*Error\s*\(auth\/[^)]+\)\.\s*/i, '').trim();
        // Remove any remaining "Firebase:" prefix
        errorMessage = errorMessage.replace(/^Firebase:\s*/i, '').trim();
      }
      
      // If message is empty after cleaning, use default
      setError(errorMessage || "Registration Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setError("");

    try {
      await authService.signInWithGoogle();
      
      // Fetch profile immediately after successful signup
      console.log('✅ Google signup successful, fetching profile...');
      await fetchProfile(true); // Force fetch to ensure fresh data
      
      // Redirect new users to onboarding to complete their profile
      navigate("/onboarding/profile-setup");
    } catch (err) {
      console.error('Google signup error:', err);
      // Extract only the message, not the full error object
      let errorMessage = "Google Sign-up Failed";
      
      if (err?.message) {
        errorMessage = err.message;
        // Remove "Firebase: Error (auth/...)" prefix if present
        errorMessage = errorMessage.replace(/^Firebase:\s*Error\s*\(auth\/[^)]+\)\.\s*/i, '').trim();
        // Remove any remaining "Firebase:" prefix
        errorMessage = errorMessage.replace(/^Firebase:\s*/i, '').trim();
      }
      
      // If message is empty after cleaning, use default
      setError(errorMessage || "Google Sign-up Failed");
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
              Join Mixer Today
            </h2>
            <p className="text-gray-600">
              Create your account and start connecting safely
            </p>
          </div>

          {/* Signup Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Full Name Field */}
              {/* <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent transition-colors duration-200 bg-white"
                  style={{ 
                    height: '56px',
                    borderColor: '#D1D5DB'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#5D1751'}
                  onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                  placeholder="Enter your full name"
                />
              </div> */}

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
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent transition-colors duration-200 bg-white"
                  style={{ 
                    height: '56px',
                    borderColor: '#D1D5DB'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#5D1751'}
                  onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                  placeholder="Enter your email"
                />
              </div>


              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent transition-colors duration-200 bg-white"
                    style={{ 
                      height: '56px',
                      borderColor: '#D1D5DB'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#5D1751'}
                    onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters long
                </p>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent transition-colors duration-200 bg-white"
                    style={{ 
                      height: '56px',
                      borderColor: '#D1D5DB'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#5D1751'}
                    onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* REMOVED: Checkbox and 'I agree to the Terms of Service and Privacy Policy' line */}
              {/*
              <div className="flex items-center">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  required
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="agreeToTerms"
                  className="ml-2 block text-sm text-gray-700"
                >
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    style={{ color: '#5D1751' }}
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    style={{ color: '#5D1751' }}
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
              */}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: '#5D1751',
                  height: '56px'
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>

            {/* Google Sign Up */}
            <div className="mt-6">
              <button
                onClick={handleGoogleSignUp}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-2xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ height: '56px' }}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {isLoading ? "Signing up..." : "Sign up with Google"}
              </button>
            </div>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium"
                  style={{ color: '#5D1751' }}
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Legal Links Footer (Outside the white card, for consistency) */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              By signing up, you agree to our{" "}
              <Link 
                to="/terms" 
                style={{ color: '#5D1751' }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link 
                to="/privacy" 
                style={{ color: '#5D1751' }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Safety Notice */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-teal-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-teal-800">
                  Safety First
                </h3>
                <p className="text-sm text-teal-700 mt-1">
                  All Mixer members undergo background checks to ensure a safe
                  and trustworthy community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;