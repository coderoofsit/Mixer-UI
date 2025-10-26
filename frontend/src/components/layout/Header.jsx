import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../ui/Logo";
import authService from "../../services/authService";
import { useProfile } from "../../contexts/ProfileContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { profileData, primaryImage, clearProfile, loading } = useProfile();
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication based on authService AND profileData
  const isAuthenticated = authService.isAuthenticated() || profileData !== null;

  // Debug log
  useEffect(() => {
    console.log('📍 Header - profileData:', profileData);
    console.log('📍 Header - primaryImage:', primaryImage);
    console.log('📍 Header - isAuthenticated:', isAuthenticated);
  }, [profileData, primaryImage, isAuthenticated]);

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      clearProfile();
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop/Tablet Navigation */}
          <nav className="hidden md:flex space-x-3 lg:space-x-6 xl:space-x-8">
            <Link
              to="/dashboard"
              className="relative text-gray-700 hover:text-primary-600 px-1.5 lg:px-2 xl:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors group whitespace-nowrap"
            >
              Dashboard
              <span className="absolute bottom-0 right-0 h-0.5 bg-primary-600 transition-all duration-700 ease-out w-0 group-hover:w-full"></span>
            </Link>
            <Link
              to="/matches"
              className="relative text-gray-700 hover:text-primary-600 px-1.5 lg:px-2 xl:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors group whitespace-nowrap"
            >
              Matches
              <span className="absolute bottom-0 right-0 h-0.5 bg-primary-600 transition-all duration-700 ease-out w-0 group-hover:w-full"></span>
            </Link>
            <Link
              to="/profile"
              className="relative text-gray-700 hover:text-primary-600 px-1.5 lg:px-2 xl:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors group whitespace-nowrap"
            >
              Profile
              <span className="absolute bottom-0 right-0 h-0.5 bg-primary-600 transition-all duration-700 ease-out w-0 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Desktop/Tablet Auth Buttons or Profile */}
          <div className="hidden md:flex items-center space-x-1.5 lg:space-x-2 xl:space-x-4 flex-shrink-0">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link to="/profile" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                  {primaryImage ? (
                    <img
                      src={primaryImage}
                      alt={profileData?.name || "User"}
                      className="w-10 h-10 rounded-full object-cover border-2 border-primary-600"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold border-2 border-primary-600">
                      {profileData?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-gray-700 hover:text-primary-600 transition-colors font-medium px-2 lg:px-3 xl:px-4 py-2 rounded-lg hover:bg-primary-50 text-xs lg:text-sm whitespace-nowrap"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login', { state: { from: location.pathname } })}
                  className="text-gray-700 hover:text-primary-600 transition-colors font-medium px-2 lg:px-3 xl:px-4 py-2 rounded-lg hover:bg-primary-50 text-xs lg:text-sm whitespace-nowrap"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup', { state: { from: location.pathname } })}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-3 lg:px-4 xl:px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 text-xs lg:text-sm whitespace-nowrap"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 transition-colors p-2"
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
                to="/dashboard"
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium py-2 px-2 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/matches"
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium py-2 px-2 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Matches
              </Link>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium py-2 px-2 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>

              {/* Mobile Auth Buttons or Profile */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 py-2.5 px-4 rounded-lg hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {primaryImage ? (
                        <img
                          src={primaryImage}
                          alt={profileData?.name || "User"}
                          className="w-10 h-10 rounded-full object-cover border-2 border-primary-600"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold border-2 border-primary-600">
                          {profileData?.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}
                      <span className="text-gray-900 font-medium">{profileData?.name || "User"}</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-center text-gray-700 hover:text-primary-600 transition-colors font-medium py-2.5 px-4 rounded-lg hover:bg-gray-50"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        navigate('/login', { state: { from: location.pathname } });
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-center text-gray-700 hover:text-primary-600 transition-colors font-medium py-2.5 px-4 rounded-lg hover:bg-gray-50"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        navigate('/signup', { state: { from: location.pathname } });
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 shadow-sm"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
