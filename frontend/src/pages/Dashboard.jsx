import React from "react";
import { Link } from "react-router-dom";
import authService from "../services/authService";

const Dashboard = () => {
  const user = authService.getCurrentUser();

  const handleSignOut = () => {
    authService.signOut();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Mixer, {user?.name || user?.given_name || "User"}!
            </h1>
            <p className="text-gray-600 mb-8">
              You're now part of our safe, verified community.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-teal-800 mb-2">
                  Complete Your Profile
                </h3>
                <p className="text-teal-600 text-sm">
                  Add photos and details to help others get to know you.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Background Check
                </h3>
                <p className="text-red-600 text-sm">
                  Complete your background verification for full access.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Upcoming Events
                </h3>
                <p className="text-gray-600 text-sm">
                  Check out our next mixer events in Colorado Springs.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/profile"
                className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Complete Profile
              </Link>
              <Link
                to="/events"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                View Events
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
