import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const LandingHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex justify-between items-center py-5"
          style={{
            height: "138.48px",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex items-center">
                {/* Logo from assets */}
                <img
                  src="/assets/mixerlogo.png"
                  alt="Mixer Logo"
                  className="w-60 h-25"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="hover:text-teal-600 transition-colors font-medium"
              style={{ fontSize: "16px", color: "#000000B3" }}
            >
              Home
            </Link>
            <Link
              to="/events"
              className={`transition-colors font-medium ${
                location.pathname === "/events"
                  ? "text-teal-600 underline"
                  : "hover:text-teal-600"
              }`}
              style={{ fontSize: "16px", color: "#000000B3" }}
            >
              Upcoming Events
            </Link>
            <Link
              to="/blind-mixers"
              className={`transition-colors font-medium ${
                location.pathname === "/blind-mixers"
                  ? "text-teal-600 underline"
                  : "hover:text-teal-600"
              }`}
              style={{ fontSize: "16px", color: "#000000B3" }}
            >
              Blind Mixers
            </Link>
            <Link
              to="/contact"
              className="hover:text-teal-600 transition-colors font-medium"
              style={{ fontSize: "16px", color: "#000000B3" }}
            >
              Contact
            </Link>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-teal-600 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-teal-50"
              style={{ fontSize: "16px" }}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              style={{ fontSize: "16px" }}
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-teal-600 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-teal-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/events"
                className={`transition-colors font-medium ${
                  location.pathname === "/events"
                    ? "text-teal-600 underline"
                    : "text-gray-700 hover:text-teal-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Upcoming Events
              </Link>
              <Link
                to="/blind-mixers"
                className={`transition-colors font-medium ${
                  location.pathname === "/blind-mixers"
                    ? "text-teal-600 underline"
                    : "text-gray-700 hover:text-teal-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blind Mixers
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-teal-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-gray-200">
                <Link
                  to="/login"
                  className="block text-gray-700 hover:text-teal-600 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg mt-2 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default LandingHeader;
