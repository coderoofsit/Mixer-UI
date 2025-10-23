import React from "react";
import LandingHeader from "../components/layout/LandingHeader";

const UpcomingEvents = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-0 min-h-screen">
          {/* Left Side - Image (2/3 width) */}
          <div className="lg:col-span-2 relative">
            <div
              className="h-full w-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-10"></div>

              {/* Speech Bubble Overlay */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-white rounded-2xl px-6 py-4 shadow-lg max-w-xs">
                  <p className="text-gray-800 text-sm font-medium">
                    This fall, I'm looking for...{" "}
                    <span className="text-red-500">❤️</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content (1/3 width) */}
          <div className="lg:col-span-1 bg-white p-8 lg:p-12 flex flex-col justify-center">
            <div className="max-w-lg">
              {/* Skip the Swipe */}
              <p className="text-red-600 font-medium text-sm mb-2">
                SKIP THE SWIPE
              </p>

              {/* Main Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 leading-tight">
                HOW OUR MIXER EVENTS WORK
              </h1>

              {/* Steps */}
              <div className="space-y-8">
                {/* Step 1 */}
                <div>
                  <h3 className="text-lg font-bold text-teal-600 mb-3">
                    STEP 1 | WE PICK THE PERFECT LOCAL SPOT
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    We scout out the best places in town — think cozy lounges,
                    rooftop patios, or that new wine bar everyone's talking
                    about. All you have to do is show up ready to mingle (and
                    maybe fall for someone unexpected).
                  </p>
                </div>

                {/* Step 2 */}
                <div>
                  <h3 className="text-lg font-bold text-teal-600 mb-3">
                    STEP 2 | GET BACKGROUND CHECKED AND BECOME A MEMBER
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    No catfish. No creeps. Just real people looking for real
                    connections. Before joining the fun, every member goes
                    through a quick background check to keep our community safe,
                    classy, and ick-free.
                  </p>
                </div>

                {/* Step 3 */}
                <div>
                  <h3 className="text-lg font-bold text-orange-500 mb-3">
                    STEP 3 | YOU ENJOY CURATED EVENT
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    Sip, laugh, and spark something new. Each Mixer is designed
                    to take the pressure off — no awkward setups, just organic
                    connections in a fun, relaxed atmosphere. You never know who
                    you'll meet next.
                  </p>
                </div>
              </div>

              {/* Scroll to top button */}
              <div className="mt-12 flex justify-end">
                <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Event Image */}
            <div className="relative">
              <div
                className="h-96 w-full bg-cover bg-center bg-no-repeat rounded-lg"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg"></div>

                {/* Speech Bubble Overlay */}
                <div className="absolute top-8 left-8">
                  <div className="bg-white rounded-2xl px-6 py-4 shadow-lg max-w-xs">
                    <p className="text-gray-800 text-sm font-medium">
                      This fall, I'm looking for...{" "}
                      <span className="text-red-500">❤️</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Event Details */}
            <div className="space-y-6">
              {/* Event Date */}
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">13</div>
                  <div className="text-sm text-gray-600">THU</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">
                    NOVEMBER 13, 2025 @ 7:00 PM - 10:00 PM
                  </div>
                </div>
              </div>

              {/* Event Title */}
              <h2 className="text-2xl font-bold text-gray-900">
                November Mixer: where real people meet, not just profiles
              </h2>

              {/* Location */}
              <div className="flex items-center space-x-2 text-gray-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>4 South 28th Street, Colorado Springs, CO 80904</span>
              </div>

              {/* Event Description */}
              <p className="text-gray-700 leading-relaxed">
                November Mixer! Cocktails, music & curated connections — meet
                face-to-face, not screen-to-screen.
              </p>

              {/* Ticket Info */}
              <div className="flex items-center space-x-6">
                <div className="bg-gray-100 rounded-lg px-4 py-2">
                  <span className="text-2xl font-bold text-gray-900">
                    $28.52
                  </span>
                </div>
                <div className="bg-gray-100 rounded-lg px-4 py-2">
                  <span className="text-sm text-gray-600">95 TICKETS LEFT</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Buy tickets
                </button>
                <button className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  View details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end">
            <div className="bg-gradient-to-r from-yellow-400 to-purple-800 rounded-2xl p-6 max-w-md">
              <div className="flex items-center space-x-4">
                {/* Left side - Yellow background */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium text-gray-800">
                    November 13th
                  </div>
                  <div className="text-xs text-gray-600">
                    07:00 PM - 10:00 PM
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-xs text-gray-600">
                      Ristorante Di Sopra
                    </span>
                  </div>
                </div>

                {/* Right side - Purple background */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-white">
                    <div className="text-2xl font-bold">Singles</div>
                    <div className="text-2xl font-bold">MIXER</div>
                  </div>
                  <div className="bg-white rounded-lg px-3 py-1">
                    <span className="text-xs font-medium text-gray-800">
                      DRINK MUSIC MEET
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-red-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="text-xs text-center lg:text-left mb-4 lg:mb-0">
              © Copyright 2025 | Mixer | All Rights Reserved | Privacy Policy |
              Terms & Conditions | Contact Support | Powered by Mountain Air
              Marketing
            </div>

            {/* Scroll to top button */}
            <button className="w-6 h-6 bg-red-700 rounded flex items-center justify-center hover:bg-red-600 transition-colors">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UpcomingEvents;
