import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext";
import LandingHeader from "../components/layout/LandingHeader";
import Footer from "../components/layout/Footer";

const Welcome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profileData } = useProfile();

  // Extract name from profile or location state
  const userName = location.state?.name || profileData?.name || "there";
  const firstName = userName.split(' ')[0];

  // If user has already completed onboarding, redirect to home
  useEffect(() => {
    if (profileData?.gender && profileData?.dateOfBirth) {
      navigate('/', { replace: true });
    }
  }, [profileData, navigate]);

  const handleGetStarted = () => {
    navigate("/onboarding/profile-setup");
  };

  return (
    <>
      <LandingHeader />
      <div className="min-h-screen flex items-center justify-center px-4 py-8" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <div className="max-w-2xl w-full">
          {/* Welcome Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center">
            {/* Success Icon */}
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-teal-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Welcome Message */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Welcome to Mixer 🎉
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              We're excited to have you join our community!
            </p>

            <div className="bg-gradient-to-r from-purple-50 to-teal-50 rounded-2xl p-6 mb-8">
              <p className="text-base text-gray-700 mb-4">
                Before you start connecting with amazing people in Colorado Springs, let's set up your profile. It only takes a minute!
              </p>
              
              <div className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Share your story:</span> Tell us about yourself
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Add your photos:</span> Show your best self
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Set your preferences:</span> Find your perfect match
                  </p>
                </div>
              </div>
            </div>

            {/* Getting Started Button */}
            <button
              onClick={handleGetStarted}
              className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              style={{ 
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              }}
            >
              Getting Started
            </button>

            <p className="text-sm text-gray-500 mt-6">
              Takes less than 2 minutes to complete
            </p>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-white text-sm opacity-90">
              All new members undergo background checks for your safety
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Welcome;

