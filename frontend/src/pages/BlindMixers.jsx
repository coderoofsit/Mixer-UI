import React from "react";
import LandingHeader from "../components/layout/LandingHeader";
import Footer from "../components/layout/Footer";

const BlindMixers = () => {
  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "Times New Roman, serif" }}
    >
      <LandingHeader />

      {/* Hero Section */}
      <div className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className="font-bold text-teal-600 mb-8 leading-tight"
              style={{ fontSize: "32px" }}
            >
              Tired of bad dates—or worse, no dates at all?
            </h1>
            <div style={{ width: "80%", margin: "0 auto" }}>
              <p
                className="text-gray-700 mb-12"
                style={{
                  fontSize: "16px",
                  fontWeight: "300",
                  lineHeight: "2em",
                  letterSpacing: "0px",
                  wordSpacing: "0px",
                }}
              >
                Maybe you've been told you're just choosing the wrong partner,
                or maybe you're simply over the endless swiping, awkward small
                talk, and wasted time. At Mixer, we do things differently. We'll
                match you with the right person and curate the perfect date—no
                apps, no stress, no guesswork. All you have to do is show up and
                have FUN!
              </p>
            </div>
            <div className="text-center">
              <span
                className="text-gray-800 underline cursor-pointer hover:text-teal-600 transition-colors"
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  lineHeight: "0px",
                  letterSpacing: "2px",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                LET'S GET STARTED
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Banner */}
      <div className="flex justify-center py-8">
        <button
          className="text-white px-10 py-5 rounded-full font-semibold text-base uppercase tracking-wide transition-colors duration-200"
          style={{
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#038386",
            hover: { backgroundColor: "#027373" },
          }}
        >
          COMING SOON: SINGLES NIGHT DETAILS
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-8 min-h-screen">
          {/* Left Side - Image (40% width) */}
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

          {/* Right Side - Content (60% width) */}
          <div className="lg:col-span-3 bg-white p-8 lg:p-12 flex flex-col justify-center">
            <div className="w-full">
              {/* Skip the Swipe */}
              <p className="text-red-600 font-medium text-sm mb-2">
                SKIP THE SWIPE
              </p>

              {/* Main Title */}
              <h1
                className="text-gray-900 mb-12 leading-tight"
                style={{
                  fontSize: "65px",
                  fontWeight: "600",
                }}
              >
                HOW OUR BLIND MIXER WORKS
              </h1>

              {/* Steps */}
              <div className="space-y-10">
                {/* Step 1 */}
                <div>
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ color: "#038386" }}
                  >
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
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ color: "#A42831" }}
                  >
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
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ color: "#D59331" }}
                  >
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
            </div>
          </div>
        </div>
      </div>

      {/* Spacing between content and footer */}
      <div className="py-8"></div>

      <Footer />
    </div>
  );
};

export default BlindMixers;
