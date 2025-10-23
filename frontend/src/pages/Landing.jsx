import React from "react";
import LandingHeader from "../components/layout/LandingHeader";

const Landing = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F0E6" }}>
      <LandingHeader />

      {/* Hero Section */}
      <section
        className="relative py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#F5F0E6" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative min-h-[600px]">
            {/* Dark Gray Card */}
            <div className="bg-gray-800 rounded-3xl p-12 shadow-2xl relative z-10 w-3/4 h-[500px] flex items-center">
              <div className="text-white max-w-lg">
                <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
                  Stop Swiping,{" "}
                  <span className="text-teal-400 relative">
                    Start Living.
                    <svg
                      className="absolute -bottom-2 left-0 w-full h-4 text-teal-400"
                      viewBox="0 0 500 150"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,50 Q125,0 250,50 T500,50"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                    </svg>
                  </span>
                </h1>

                <div className="mb-8">
                  <a
                    href="/contact"
                    className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full transition-colors duration-200 text-lg"
                  >
                    Join Mixer Today
                  </a>
                </div>

                <div className="space-y-4 text-lg text-white">
                  <p>
                    You wouldn't hire someone without a background check- so why
                    meet a date without knowing who they are?
                  </p>
                  <p>
                    Mixer is the local dating service that puts safety first so
                    you can connect with confidence.
                  </p>
                </div>

                <h5 className="text-white text-xl font-semibold mt-8">
                  A whole new way to connect — safely!
                </h5>
              </div>
            </div>

            {/* Overlapping Image */}
            <div className="absolute top-8 right-0 z-20 w-1/2 h-[500px]">
              <img
                src="https://mixerltd.com/wp-content/uploads/2025/09/Mixer-SMM-Posts.jpg.webp"
                alt="Mixer Dating App"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
              {/* Speech bubble overlay */}
              <div className="absolute bottom-4 right-4 bg-white rounded-full p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">♥</span>
                  </div>
                  <span className="text-gray-800 font-medium">
                    This fall, I'm looking for...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet with Mixer Section */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#F5F0E6" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative min-h-[400px]">
            {/* Red Card */}
            <div className="bg-red-600 rounded-3xl p-12 shadow-2xl relative z-10 w-3/4 h-[350px] flex items-center">
              <div className="text-white max-w-lg">
                <h2 className="text-4xl font-bold mb-6">Meet with Mixer</h2>
                <p className="text-lg text-white mb-8 leading-relaxed">
                  We're not your average dating service. Our events are
                  thoughtfully curated to bring singles together in a safe,
                  inclusive, and enjoyable environment. Every participant is
                  background-checked and every gathering is designed to foster
                  genuine interaction. Whether you're looking for a new
                  connection or just want to get out and enjoy life, we offer a
                  unique approach to dating that blends technology with personal
                  touch.
                </p>
                <a
                  href="/upcoming-events"
                  className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200"
                >
                  Upcoming Events
                </a>
              </div>
            </div>

            {/* Overlapping Image */}
            <div className="absolute top-8 right-0 z-20 w-1/2 h-[350px]">
              <img
                src="https://mixerltd.com/wp-content/uploads/2025/10/kelly-sikkema-4le7k9XVYjE-unsplash-scaled.jpg.webp"
                alt="Dating scene"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
              {/* Speech bubble overlay */}
              <div className="absolute bottom-4 left-4 bg-white rounded-full p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">♥</span>
                  </div>
                  <span className="text-gray-800 font-medium">
                    This fall, I'm looking for...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#F5F0E6" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Background Checks */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Background Checks
              </h3>
              <p className="text-gray-700 leading-relaxed">
                All participants undergo a thorough background check to ensure a
                safe and trustworthy community. Your peace of mind is our
                priority, so you can focus on making genuine connections.
              </p>
            </div>

            {/* Curated Mixers */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Curated Mixers
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We host fun and engaging singles events right here in Colorado
                Springs, bringing local people together in meaningful ways. From
                blind dating to social mixers, every event is curated to help
                you connect in a relaxed, real-life setting.
              </p>
            </div>

            {/* Age Inclusive */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Age-Inclusive
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our events are designed for singles ages 21 to 60, creating
                opportunities for meaningful connections across a wide age
                range. Whether you're in your twenties or nearing retirement,
                there's a place for you here.
              </p>
            </div>
          </div>

          {/* Additional Features */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Blind Mixer
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Blind Mixer takes all the guesswork out of dating. We handle
                every detail from matching to reservations—carefully curated to
                give you the best chance at real connection. Just show up and
                enjoy.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Local Focus
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We're Colorado Springs locals who understand the dating scene
                here. Our events are designed specifically for our community,
                making it easier to meet people who share your values and
                lifestyle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#F5F0E6" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-800 rounded-3xl p-12 shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="flex space-x-4">
                <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-quote-right text-white text-xl"></i>
                </div>
                <div className="flex space-x-2">
                  <img
                    src="https://mixerltd.com/wp-content/uploads/2025/06/Finance-App-Avatar-1.webp"
                    alt="Avatar 1"
                    className="w-12 h-12 rounded-full"
                  />
                  <img
                    src="https://mixerltd.com/wp-content/uploads/2025/06/Finance-App-Avatar-2.webp"
                    alt="Avatar 2"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">
                  - Jennifer M. <br />
                  Colorado Springs
                </h4>
                <p className="text-lg text-gray-300 leading-relaxed">
                  "I've tried all the major dating apps, Mixer is the first one
                  that actually makes me feel safe. Knowing everyone is
                  background checked gives me so much more confidence to meet
                  people in real life. I can't wait to experience the app once
                  it launches."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#F5F0E6" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Membership */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Memberships
                </h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-teal-600">$24</span>
                  <span className="text-3xl text-gray-600">.99</span>
                  <span className="text-lg text-gray-600 ml-2">Month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <i className="fas fa-check text-teal-600 mr-3"></i>
                    <span>Feature</span>
                  </li>
                </ul>
                <a
                  href="/contact"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200 inline-block text-center"
                >
                  Start Mixer
                </a>
              </div>
            </div>

            {/* Background Check */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Background Check
                </h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-teal-600">$7</span>
                  <span className="text-3xl text-gray-600">.99</span>
                  <span className="text-lg text-gray-600 ml-2">
                    One Time Payment
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <i className="fas fa-check text-teal-600 mr-3"></i>
                    <span>Feature</span>
                  </li>
                </ul>
                <a
                  href="/contact"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200 inline-block text-center"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Started Section */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#F5F0E6" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-24 h-1 bg-teal-600 mb-6"></div>
              <h4 className="text-2xl font-bold text-gray-900 mb-8">
                How It Started
              </h4>
            </div>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                At Mixer, we're not just changing how people date—we're changing
                what people expect from dating.
              </p>
              <p>
                Founded by a decades-long dating app user who, like you, got
                tired of swiping and wondering, "Is this really it?" Mixer was
                created for people who want more: real connections, in-person
                events, and a dating experience grounded in authenticity and
                safety.
              </p>
              <p>
                That's why every applicant is background-checked, and why
                membership comes with a price tag. Because let's be honest—the
                best investment you can make is in yourself, and when people pay
                to be here, it shows they're serious about showing up.
              </p>
              <p>
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
        style={{ backgroundColor: "#F5F0E6" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-3xl p-12 shadow-2xl text-center">
            <img
              src="https://mixerltd.com/wp-content/uploads/2025/10/kelly-sikkema-4le7k9XVYjE-unsplash-scaled.jpg.webp"
              alt="Ready to Meet Someone Real"
              className="w-full h-64 object-cover rounded-2xl mb-8"
            />
            <h2 className="text-4xl font-bold mb-6 text-white">
              Ready to Meet Someone Real — and Verified?
            </h2>
            <p className="text-xl mb-8 leading-relaxed text-gray-300">
              Join a community where safety comes first and real connections
              happen locally. With background checks built in, Mixer gives you
              peace of mind while you focus on finding the right match.
            </p>
            <a
              href="/contact"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-full transition-colors duration-200 text-lg"
            >
              Contact Mixer
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm">
            © Copyright 2025 | Mixer | All Rights Reserved |{" "}
            <a
              href="/privacy-policy"
              className="text-white hover:text-teal-400"
            >
              Privacy Policy
            </a>{" "}
            |{" "}
            <a
              href="/terms-conditions"
              className="text-white hover:text-teal-400"
            >
              Terms & Conditions
            </a>{" "}
            |{" "}
            <a href="/support" className="text-white hover:text-teal-400">
              Contact Support
            </a>{" "}
            | Powered by Mountain Air Marketing
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
