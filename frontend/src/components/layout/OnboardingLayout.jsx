import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OnboardingLayout = ({ 
  children, 
  title = "Mixer Starts with",
  subtitle = "Your Personal Touch",
  showBackButton = true,
  onBack
}) => {
  const navigate = useNavigate();
  const [bubblePosition, setBubblePosition] = useState(0);

  // Animate bubbles
  useEffect(() => {
    const interval = setInterval(() => {
      setBubblePosition((prev) => (prev + 1) % 120);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  // Calculate bubble positions with smooth animation
  const rightBubbleTop = 20 + (Math.sin(bubblePosition / 20) * 30);
  const leftBubbleTop = 60 - (Math.sin(bubblePosition / 20) * 20);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#5D1751" }}>
      {/* Header */}
      <div
        className="relative"
        style={{
          backgroundColor: "#4A1342",
          minHeight: "140px",
        }}
      >
        {/* Animated Bubbles */}
        <div
          className="absolute rounded-full"
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            top: `${leftBubbleTop}px`,
            left: "50px",
            transition: "top 0.3s ease-in-out",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            top: `${rightBubbleTop}px`,
            right: "20px",
            transition: "top 0.3s ease-in-out",
          }}
        />

        {/* Header Content */}
        <div className="relative px-6 py-6 flex items-center">
          {/* Back Button */}
          {showBackButton && (
            <button
              onClick={handleBackClick}
              className="absolute left-6 top-6 w-10 h-10 flex items-center justify-center rounded-full"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Centered Title */}
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold text-white mb-2">{title}</h1>
            <p className="text-sm text-white opacity-90">{subtitle}</p>
            <div
              className="mx-auto mt-4"
              style={{
                width: "40px",
                height: "2px",
                backgroundColor: "#F8F4F7",
              }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pb-6">
        <div className="lg:max-w-[600px] lg:mx-auto lg:px-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;

