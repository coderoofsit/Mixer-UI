import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import ProfileDropdown from "../ui/ProfileDropdown";

const LandingHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
    };

    checkAuth();

    // Listen for auth state changes (optional - can be improved with event listeners)
    const interval = setInterval(checkAuth, 1000);

    return () => clearInterval(interval);
  }, []);

  // Hide auth buttons on login, signup, and forgot-password pages
  const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(location.pathname);

  return (
    <header className="bg-white shadow-sm">
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
                  className="w-40 h-auto sm:w-48 md:w-60"
                />
              </div>
            </Link>
          </div>

          {/* Desktop/Tablet Navigation */}
          <nav className="hidden md:flex space-x-2 lg:space-x-4 xl:space-x-8">
            <Link
              to="/"
              className={`relative font-medium transition-all duration-500 whitespace-nowrap ${
                location.pathname === "/"
                  ? "text-black"
                  : "text-gray-700 hover:text-black"
              }`}
              style={{ fontSize: "13px" }}
            >
              Home
              <span
                className={`absolute bottom-0 right-0 h-0.5 bg-black transition-all duration-700 ease-out ${
                  location.pathname === "/" ? "w-full" : "w-0"
                }`}
              ></span>
            </Link>
            <Link
              to="/events"
              className={`relative font-medium transition-all duration-500 whitespace-nowrap ${
                location.pathname === "/events"
                  ? "text-black"
                  : "text-gray-700 hover:text-black"
              }`}
              style={{ fontSize: "13px" }}
            >
              Upcoming Events
              <span
                className={`absolute bottom-0 right-0 h-0.5 bg-black transition-all duration-700 ease-out ${
                  location.pathname === "/events" ? "w-full" : "w-0"
                }`}
              ></span>
            </Link>
            <Link
              to="/blind-mixers"
              className={`relative font-medium transition-all duration-500 whitespace-nowrap ${
                location.pathname === "/blind-mixers"
                  ? "text-black"
                  : "text-gray-700 hover:text-black"
              }`}
              style={{ fontSize: "13px" }}
            >
              Blind Mixers
              <span
                className={`absolute bottom-0 right-0 h-0.5 bg-black transition-all duration-700 ease-out ${
                  location.pathname === "/blind-mixers" ? "w-full" : "w-0"
                }`}
              ></span>
            </Link>
            <Link
              to="/contact"
              className={`relative font-medium transition-all duration-500 whitespace-nowrap ${
                location.pathname === "/contact"
                  ? "text-black"
                  : "text-gray-700 hover:text-black"
              }`}
              style={{ fontSize: "13px" }}
            >
              Contact
              <span
                className={`absolute bottom-0 right-0 h-0.5 bg-black transition-all duration-700 ease-out ${
                  location.pathname === "/contact" ? "w-full" : "w-0"
                }`}
              ></span>
            </Link>
          </nav>

          {/* Auth Buttons / Profile - Desktop/Tablet */}
          <div className="hidden md:flex items-center space-x-1.5 lg:space-x-3 xl:space-x-4">
            {isAuthenticated ? (
              <ProfileDropdown />
            ) : !isAuthPage ? (
              <>
                <button
                  onClick={() => navigate('/login', { state: { from: location.pathname } })}
                  className="text-gray-700 hover:text-teal-600 transition-colors font-medium px-2 lg:px-3 xl:px-4 py-2 rounded-lg hover:bg-teal-50 whitespace-nowrap text-xs lg:text-sm xl:text-base"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup', { state: { from: location.pathname } })}
                  className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-medium py-2 px-3 lg:px-4 xl:px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg whitespace-nowrap text-xs lg:text-sm xl:text-base"
                >
                  Sign Up
                </button>
              </>
            ) : null}
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
          <div className="md:hidden pb-4 border-t border-gray-100 mt-2">
            <nav className="flex flex-col space-y-3 pt-4">
              <Link
                to="/"
                className={`relative font-medium transition-all duration-500 ${
                  location.pathname === "/"
                    ? "text-black"
                    : "text-gray-700 hover:text-black"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
                <span
                  className={`absolute bottom-0 right-0 h-0.5 bg-black transition-all duration-700 ease-out ${
                    location.pathname === "/" ? "w-full" : "w-0"
                  }`}
                ></span>
              </Link>
              <Link
                to="/events"
                className={`relative font-medium transition-all duration-500 ${
                  location.pathname === "/events"
                    ? "text-black"
                    : "text-gray-700 hover:text-black"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Upcoming Events
                <span
                  className={`absolute bottom-0 right-0 h-0.5 bg-black transition-all duration-700 ease-out ${
                    location.pathname === "/events" ? "w-full" : "w-0"
                  }`}
                ></span>
              </Link>
              <Link
                to="/blind-mixers"
                className={`relative font-medium transition-all duration-500 ${
                  location.pathname === "/blind-mixers"
                    ? "text-black"
                    : "text-gray-700 hover:text-black"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blind Mixers
                <span
                  className={`absolute bottom-0 right-0 h-0.5 bg-black transition-all duration-700 ease-out ${
                    location.pathname === "/blind-mixers" ? "w-full" : "w-0"
                  }`}
                ></span>
              </Link>
              <Link
                to="/contact"
                className={`relative font-medium transition-all duration-500 ${
                  location.pathname === "/contact"
                    ? "text-black"
                    : "text-gray-700 hover:text-black"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
                <span
                  className={`absolute bottom-0 right-0 h-0.5 bg-black transition-all duration-700 ease-out ${
                    location.pathname === "/contact" ? "w-full" : "w-0"
                  }`}
                ></span>
              </Link>

              {/* Mobile Auth Buttons / Profile */}
              <div className="pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="block text-gray-700 hover:text-teal-600 transition-colors font-medium py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="block text-gray-700 hover:text-teal-600 transition-colors font-medium py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={async () => {
                        await authService.signOut();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left text-red-600 hover:text-red-700 transition-colors font-medium py-2"
                    >
                      Logout
                    </button>
                  </>
                ) : !isAuthPage ? (
                  <>
                    <button
                      onClick={() => {
                        navigate('/login', { state: { from: location.pathname } });
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left text-gray-700 hover:text-teal-600 transition-colors font-medium py-2"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        navigate('/signup', { state: { from: location.pathname } });
                        setIsMenuOpen(false);
                      }}
                      className="block w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg mt-2 text-center"
                    >
                      Sign Up
                    </button>
                  </>
                ) : null}
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Decorative Border */}
      <div
        className="w-full h-3"
        style={{
          background:
            "linear-gradient(90deg, #FDF6F0 0%, #FEF9E7 50%, #FDF6F0 100%)",
        }}
      ></div>
    </header>
  );
};

export default LandingHeader;
