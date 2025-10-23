import React from "react";

const Logo = ({ size = "md", className = "" }) => {
  const sizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Heart Icon */}
      <div className={`${sizes[size]} relative`}>
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <defs>
            <linearGradient
              id="heartGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="25%" stopColor="#EC4899" />
              <stop offset="50%" stopColor="#F97316" />
              <stop offset="75%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="url(#heartGradient)"
            stroke="url(#heartGradient)"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Text */}
      <span
        className={`font-bold text-gray-900 ${
          size === "sm"
            ? "text-lg"
            : size === "md"
            ? "text-xl"
            : size === "lg"
            ? "text-2xl"
            : "text-3xl"
        }`}
      >
        Mixer
      </span>
    </div>
  );
};

export default Logo;
