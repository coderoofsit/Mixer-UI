import React from "react";
import { useNavigate } from "react-router-dom";
import LandingHeader from "../../components/layout/LandingHeader";
import Footer from "../../components/layout/Footer";

const ProfileCompleteScreen = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate("/");
  };

  return (
    <>
      <LandingHeader />
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: "#5D1751" }}
      >
      {/* Header */}
      <div
        className="px-6 py-6 text-center"
        style={{ backgroundColor: "#4A1342" }}
      >
        <h1 className="text-2xl font-bold text-white mb-2">
          You're a Mixer Now!
        </h1>
        <p className="text-base text-white opacity-90">
          Let's start mixing and find your perfect Mix
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full lg:max-w-[500px]">
          {/* Success Icon */}
          <div className="mb-8 relative">
          {/* Outer ring */}
          <div
            className="w-32 h-32 rounded-full border-2 flex items-center justify-center"
            style={{
              borderColor: "rgba(255, 255, 255, 0.3)",
            }}
          >
            {/* Middle ring */}
            <div
              className="w-26 h-26 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Inner circle */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#4A1342" }}
              >
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Animated particles */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div
              className="absolute w-2 h-2 bg-white rounded-full opacity-60 animate-ping"
              style={{ top: "10%", left: "20%" }}
            />
            <div
              className="absolute w-2 h-2 bg-white rounded-full opacity-60 animate-ping"
              style={{ top: "80%", right: "20%", animationDelay: "0.5s" }}
            />
            <div
              className="absolute w-2 h-2 bg-white rounded-full opacity-60 animate-ping"
              style={{ top: "50%", right: "5%", animationDelay: "1s" }}
            />
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-3">
            You're a Mixer Now!
          </h2>
          <p className="text-lg text-white opacity-90">
            Let's start mixing and find your perfect Mix
          </p>
        </div>

        {/* Location Card */}
        <div
          className="w-full max-w-md mb-12 p-4 rounded-2xl flex items-center shadow-lg"
          style={{ backgroundColor: "#F8F4F7" }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
            style={{ backgroundColor: "#5D1751" }}
          >
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <p className="text-base font-semibold text-black">
              Location detected
            </p>
            <p className="text-sm text-gray-600">
              Ready to find mixers near you
            </p>
          </div>
        </div>

        {/* Complete Button */}
        <button
          onClick={handleComplete}
          className="w-full max-w-md text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-xl"
          style={{
            backgroundColor: "#4A1342",
            height: "60px",
          }}
        >
          Complete Registration
        </button>

        {/* Fun facts or tips */}
        <div className="mt-12 max-w-md">
          <div
            className="p-4 rounded-2xl"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-white mr-3 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">
                  Safety First
                </h3>
                <p className="text-sm text-white opacity-80">
                  All Mixer members undergo background checks to ensure a safe
                  and trustworthy community.
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ProfileCompleteScreen;

