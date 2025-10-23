import React from "react";
import LandingHeader from "../components/layout/LandingHeader";

const BlindMixers = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />

      {/* Hero Section */}
      <div className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-teal-600 mb-8 leading-tight">
              Tired of bad dates—or worse, no dates at all?
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-12">
              Maybe you've been told you're just choosing the wrong partner, or
              maybe you're simply over the endless swiping, awkward small talk,
              and wasted time. At Mixer, we do things differently. We'll match
              you with the right person and curate the perfect date—no apps, no
              stress, no guesswork. All you have to do is show up and have FUN!
            </p>
            <div className="text-center">
              <span className="text-xl font-bold text-gray-800 underline cursor-pointer hover:text-teal-600 transition-colors">
                LET'S GET STARTED
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Banner */}
      <div className="bg-teal-600 text-white py-3">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-medium">
            COMING SOON: SINGLES NIGHT DETAILS
          </p>
        </div>
      </div>

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
              <div className="absolute bottom-8 left-8">
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
                HOW OUR BLIND MIXER WORKS
              </h1>

              {/* Steps */}
              <div className="space-y-8">
                {/* Step 1 */}
                <div>
                  <h3 className="text-lg font-bold text-teal-600 mb-3">
                    STEP 1 | WE LEARN ABOUT YOU
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    Fill out a quick submission form and schedule a time to chat
                    with one of our Mixologists about your expectations. From
                    there, you decide—keep it classic with a table for two, or
                    triple your chances with a lively table for six.
                  </p>
                </div>

                {/* Step 2 */}
                <div>
                  <h3 className="text-lg font-bold text-teal-600 mb-3">
                    STEP 2 | WE SET THE SCENE
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    This is where the magic happens. We dig into our extensive
                    database to find your perfect match. Once both parties
                    confirm, we'll finalize the details and gather payment.
                  </p>
                </div>

                {/* Step 3 */}
                <div>
                  <h3 className="text-lg font-bold text-teal-600 mb-3">
                    STEP 3 | YOU ENJOY THE DATE
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    You'll receive the location 24 hours in advance. Upon
                    arrival, your Mixologist will greet you and introduce you to
                    your party. Then it's your turn to relax, have fun, and
                    enjoy the night!
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

export default BlindMixers;
