import React from "react";
import LandingHeader from "../components/layout/LandingHeader";
import Footer from "../components/layout/Footer";
import { FaQuoteRight } from "react-icons/fa";

const Landing = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F5F5" }}>
      <LandingHeader />

      {/* Hero Section */}
      <section
        className="relative pt-20 pb-0 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative min-h-[600px]">
            {/* Dark Gray Card */}
            <div
              className="rounded-3xl p-12 shadow-2xl relative z-10 w-full h-[570px] flex items-center"
              style={{ backgroundColor: "#333333" }}
            >
              <div className="text-white w-[55%] flex flex-col justify-center">
                <h1
                  className="text-5xl lg:text-8xl font-bold mb-8 leading-tight"
                  style={{ fontFamily: "Rubik, sans-serif" }}
                >
                  <div>
                    Stop Swiping,{" "}
                    <span style={{ color: "#038386" }}>Start Living.</span>
                  </div>
                </h1>

                <div className="flex items-start gap-8 mb-8">
                  <div className="flex-shrink-0 mt-12">
                    <button
                      onClick={() => (window.location.href = "/contact")}
                      className="inline-block text-white font-bold py-4 px-8 rounded-full transition-colors duration-200 text-lg cursor-pointer"
                      style={{
                        fontFamily: "Rubik, sans-serif",
                        color: "#FFFFFF",
                        background: "linear-gradient(135deg, #A42831, #A42831)",
                        boxShadow:
                          "0 4px 15px rgba(0, 0, 0, 0.3), 0 0 10px rgba(164, 40, 49, 0.5), 0 0 0 1px rgba(164, 40, 49, 0.3)",
                        border: "none",
                      }}
                    >
                      Join Mixer Today
                    </button>
                  </div>

                  <div
                    className="space-y-3 text-base leading-relaxed"
                    style={{ color: "#FFFFFFB3" }}
                  >
                    <p>
                      You wouldn't hire someone without a background check- so
                      why meet a date without knowing who they are?
                    </p>
                    <p>
                      Mixer is the local dating service that puts safety first
                      so you can connect with confidence.
                    </p>
                  </div>
                </div>

                <h5 className="text-white text-xs font-semibold mt-8">
                  A whole new way to connect — safely!
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet with Mixer Section */}
      <section
        className="pt-0 pb-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className="rounded-3xl shadow-2xl"
            style={{
              backgroundColor: "#A42831",
              margin: "10px 0px 30px 0px",
              padding: "64px 32px 0px 32px",
              width: "750px",
              height: "450px",
            }}
          >
            <div className="text-white">
              <style jsx>{`
                p a {
                  color: #020101;
                }
              `}</style>
              <h2
                className="text-4xl font-bold mb-6"
                style={{ fontFamily: "Rubik, sans-serif" }}
              >
                Meet with Mixer
              </h2>
              <p className="text-lg mb-8 leading-relaxed">
                We're not your average dating service. Our events are
                thoughtfully curated to bring singles together in a safe,
                inclusive, and enjoyable environment. Every participant is
                background-checked and every gathering is designed to foster
                genuine interaction. Whether you're looking for a new connection
                or just want to get out and enjoy life, we offer a unique
                approach to dating that blends technology with personal touch.
              </p>
              <a
                href="/upcoming-events"
                className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200"
              >
                Upcoming Events
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Full Screen Fluid Background Section */}
      <div className="bg-fluid-gradient w-full h-screen flex items-center justify-center">
        <div className="flex gap-12">
          {/* Column 1 - Two Paragraphs */}
          <div className="w-[500px] h-[550px] flex flex-col items-center justify-center p-8">
            <h3 className="text-2xl font-bold text-black mb-4 text-center">
              BACKGROUND CHECKS
            </h3>
            <p className="text-black leading-relaxed text-center mb-8">
              All participants undergo a thorough background check to ensure a
              safe and trustworthy community. Your peace of mind is our
              priority, so you can focus on making genuine connections.
            </p>

            <h3 className="text-2xl font-bold text-black mb-4 text-center">
              CURATED MIXERS
            </h3>
            <p className="text-black leading-relaxed text-center">
              We host fun and engaging singles events right here in Colorado
              Springs, bringing local people together in meaningful ways. From
              blind dating to social mixers, every event is curated to help you
              connect in a relaxed, real-life setting.
            </p>
          </div>

          {/* Column 2 - Empty for Pictures */}
          <div className="w-[400px] h-[550px] flex items-center justify-center">
            <span className="text-black text-center">Images will go here</span>
          </div>

          {/* Column 3 - Two Paragraphs */}
          <div className="w-[500px] h-[550px] flex flex-col items-center justify-center p-8">
            <h3 className="text-2xl font-bold text-black mb-4 text-center">
              AGE-INCLUSIVE
            </h3>
            <p className="text-black leading-relaxed text-center mb-8">
              Our events are designed for singles ages 21 to 60, creating
              opportunities for meaningful connections across a wide age range.
              Whether you're in your twenties or nearing retirement, there's a
              place for you here.
            </p>

            <h3 className="text-2xl font-bold text-black mb-4 text-center">
              BLIND MIXER
            </h3>
            <p className="text-black leading-relaxed text-center">
              Blind Mixer takes all the guesswork out of dating. We handle every
              detail from matching to reservations—carefully curated to give you
              the best chance at real connection. Just show up and enjoy.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonial and Pricing Section */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Testimonial Section */}
          <div className="mb-16">
            <div className="flex max-w-4xl mx-auto">
              {/* Left Column - Quote Symbol (40% width) */}
              <div className="w-2/5 relative">
                <div className="w-20 h-20 rounded-lg relative" style={{}}>
                  <FaQuoteRight
                    size={82}
                    style={{
                      color: "#A42831",
                      position: "absolute",
                      top: "8px",
                      right: "-120px",
                    }}
                  />
                </div>
              </div>

              {/* Right Column - Content (60% width) */}
              <div className="w-3/5 pl-8">
                <div className="mb-4">
                  <h4
                    className="text-2xl font-bold"
                    style={{ color: "#000000" }}
                  >
                    - Jennifer M. <br />
                    Colorado Springs
                  </h4>
                </div>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: "#374151" }}
                >
                  "I've tried all the major dating apps, Mixer is the first one
                  that actually makes me feel safe. Knowing everyone is
                  background checked gives me so much more confidence to meet
                  people in real life. I can't wait to experience the app once
                  it launches."
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Sections */}
          <div className="grid md:grid-cols-2 gap-8 max-w-8xl max-h-5xl mx-auto">
            {/* Memberships Section */}
            <div className="bg-white overflow-hidden border border-black">
              {/* Header Banner */}
              <div
                className="w-full py-8 text-center"
                style={{ backgroundColor: "#038386" }}
              >
                <h3
                  className="text-2xl font-bold text-white uppercase tracking-wide"
                  style={{ fontFamily: "sans-serif" }}
                >
                  Memberships
                </h3>
              </div>

              {/* Content */}
              <div className="p-12 text-center">
                <div className="mb-10 flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">$</span>
                  <span className="text-7xl font-bold text-gray-900">24</span>
                  <span className="text-4xl font-bold text-gray-900">.99</span>
                  <span className="text-2xl text-gray-600 ml-3">Month</span>
                </div>

                {/* Button */}
                <button
                  className="w-100 py-4 px-10 font-semibold text-xs transition-colors duration-200 mt-16"
                  style={{
                    backgroundColor: "#E9E8E6",
                    color: "#000000",
                  }}
                >
                  START MIXER
                </button>
              </div>
            </div>

            {/* Background Check Section */}
            <div className="bg-white overflow-hidden border border-black">
              {/* Header Banner */}
              <div
                className="w-full py-8 text-center"
                style={{ backgroundColor: "#F97316" }}
              >
                <h3
                  className="text-2xl font-bold text-white uppercase tracking-wide"
                  style={{ fontFamily: "serif" }}
                >
                  Background Check
                </h3>
              </div>

              {/* Content */}
              <div className="p-12 text-center">
                <div className="mb-10 flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">$</span>
                  <span className="text-7xl font-bold text-gray-900">7</span>
                  <span className="text-4xl font-bold text-gray-900">.99</span>
                  <span className="text-2xl text-gray-600 ml-3">
                    One Time Payment
                  </span>
                </div>

                {/* Button */}
                <button
                  className="w-100 py-4 px-10 font-semibold text-xs transition-colors duration-200 mt-16"
                  style={{
                    backgroundColor: "#E9E8E6",
                    color: "#000000",
                  }}
                >
                  APPLY NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Started Section */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className="flex"
            style={{
              backgroundColor: "#F5F5F5",
              minHeight: "400px",
              padding: "24px",
            }}
          >
            {/* Left div - 40% width for title */}
            <div className="w-2/5 pr-16">
              <div className="w-85 h-px bg-teal-600 mb-6"></div>
              <h4
                className="text-4xl font-semibold"
                style={{ fontFamily: "Rubik, sans-serif", color: "#5E1053" }}
              >
                How It Started
              </h4>
            </div>

            {/* Right div - 60% width for content */}
            <div
              className="w-3/5 text-gray-700"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "2em",
              }}
            >
              <p className="mb-4">
                At Mixer, we're not just changing how people date—we're changing
                what people expect from dating.
              </p>
              <p className="mb-4">
                Founded by a decades-long dating app user who, like you, got
                tired of swiping and wondering, "Is this really it?" Mixer was
                created for people who want more: real connections, in-person
                events, and a dating experience grounded in authenticity and
                safety.
              </p>
              <p className="mb-4">
                That's why every applicant is background-checked, and why
                membership comes with a price tag. Because let's be honest—the
                best investment you can make is in yourself, and when people pay
                to be here, it shows they're serious about showing up.
              </p>
              <p className="mb-4">
                Mixer is a local-first platform that brings like-minded singles
                together through curated events where chemistry happens in real
                life—not just behind a screen.
              </p>
              <p>
                If you're ready to stop browsing and start building something
                real, welcome to Mixer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="max-w-6xl mx-auto">
          <div
            className="rounded-3xl shadow-2xl"
            style={{
              backgroundColor: "#333333",
              height: "500px",
              width: "100%",
            }}
          >
            {/* Image at the top */}
            <div className="w-full h-48 flex justify-center overflow-hidden rounded-t-3xl">
              <img
                src="https://mixerltd.com/wp-content/uploads/2025/10/kelly-sikkema-4le7k9XVYjE-unsplash-scaled.jpg.webp"
                alt="Ready to Meet Someone Real"
                className="h-50 w-auto object-contain"
              />
            </div>

            {/* Content below the image */}
            <div className="p-12 text-white flex flex-col">
              {/* Top section with headline and content */}
              <div className="flex flex-1">
                {/* Left div - Headline */}
                <div className="w-1/2 pr-8 pl-16 text-right">
                  <h2
                    className="text-2xl lg:text-4xl font-bold mb-6 leading-tight"
                    style={{
                      fontFamily: "Rubik, sans-serif",
                      fontSize: "2.8rem",
                    }}
                  >
                    READY TO MEET
                    <br />
                    SOMEONE REAL —<br />
                    AND VERIFIED?
                  </h2>
                </div>

                {/* Right div - Content */}
                <div className="w-1/2 pl-4">
                  <p
                    className="text-sm leading-relaxed text-center"
                    style={{ color: "#FFFFFFB3" }}
                  >
                    Join a community where safety comes first and real
                    <br />
                    connections happen locally. With background checks
                    <br />
                    built in, Mixer gives you peace of mind while you focus
                    <br />
                    on finding the right match.
                  </p>
                </div>
              </div>

              {/* Bottom section with centered button */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => (window.location.href = "/contact")}
                  className="inline-block text-white font-bold py-3 px-8 rounded-full transition-colors duration-200 text-lg cursor-pointer"
                  style={{
                    backgroundColor: "#D59331",
                    fontFamily: "Rubik, sans-serif",
                  }}
                >
                  Contact Mixer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
