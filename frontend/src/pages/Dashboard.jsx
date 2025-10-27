import React from "react";
import { Link } from "react-router-dom";
import authService from "../services/authService";
import LandingHeader from "../components/layout/LandingHeader";
import Footer from "../components/layout/Footer";

const Dashboard = () => {
  const user = authService.getCurrentUser();

  const handleSignOut = () => {
    authService.signOut();
    window.location.href = "/";
  };

  return (
    <>
      <LandingHeader />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            
            {/* Welcome Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to Mixer, {user?.name || user?.given_name || "User"}!
              </h1>
              <p className="text-gray-600">
                You're now part of our safe, verified community.
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12 items-center">
              
              {/* Left Column (Action Cards) */}
              <div className="lg:col-span-3 space-y-6">
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 text-left">
                  <h3 className="text-lg font-semibold text-teal-800 mb-2">
                    Complete Your Profile
                  </h3>
                  <p className="text-teal-600 text-sm mb-4">
                    Add photos and details to help others get to know you.
                  </p>
                  <Link
                    to="/profile"
                    className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-5 rounded-lg transition-all duration-200 text-sm inline-block"
                  >
                    Go to Profile
                  </Link>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-left">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">
                    Background Check
                  </h3>
                  <p className="text-red-600 text-sm mb-4">
                    Complete your background verification for full access.
                  </p>
                  <Link
                    to="/profile" // You can change this link if you have a dedicated verification page
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-lg transition-all duration-200 text-sm inline-block"
                  >
                    Check Status
                  </Link>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-left">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Upcoming Events
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Check out our next mixer events in Colorado Springs.
                  </p>
                  <Link
                    to="/events"
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-5 rounded-lg transition-all duration-200 text-sm inline-block"
                  >
                    View Events
                  </Link>
                </div>
              </div>

              {/* Right Column (SMM Image) */}
              <div style={{border: '1px solid red'}} className="Sumit">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/mixer-image.png`}
                  alt="Mixer Social Media Post - This fall, I'm looking for..."
                  className="rounded-lg shadow-lg w-full max-w-sm"
                />
              </div>
            </div>

            {/* Sign Out Button */}
            <div className="text-center">
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
      <Footer />
    </>
  );
};

export default Dashboard;