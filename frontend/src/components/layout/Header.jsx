import React from "react";
import { Link } from "react-router-dom";
import Logo from "../ui/Logo";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Logo />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/dashboard"
              className="relative text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors group"
            >
              Dashboard
              <span className="absolute bottom-0 right-0 h-0.5 bg-primary-600 transition-all duration-700 ease-out w-0 group-hover:w-full"></span>
            </Link>
            <Link
              to="/matches"
              className="relative text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors group"
            >
              Matches
              <span className="absolute bottom-0 right-0 h-0.5 bg-primary-600 transition-all duration-700 ease-out w-0 group-hover:w-full"></span>
            </Link>
            <Link
              to="/profile"
              className="relative text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors group"
            >
              Profile
              <span className="absolute bottom-0 right-0 h-0.5 bg-primary-600 transition-all duration-700 ease-out w-0 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-primary-50"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
