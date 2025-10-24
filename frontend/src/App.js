// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Contact from "./pages/Contact";
import BlindMixers from "./pages/BlindMixers";
import UpcomingEvents from "./pages/UpcomingEvents";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Matches from "./pages/Matches";
import CustomCursor from "./components/ui/CustomCursor";
import ProfileSetupScreen from "./pages/onboarding/ProfileSetupScreen";
import PhotoGalleryScreen from "./pages/onboarding/PhotoGalleryScreen";
import InterestsValuesScreen from "./pages/onboarding/InterestsValuesScreen";
import ProfileCompleteScreen from "./pages/onboarding/ProfileCompleteScreen";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import Terms from "./pages/Terms"; // Import the existing component
import Privacy from "./pages/Privacy"; // Import the NEW component

function App() {
  useEffect(() => {
    // Global error handler for unhandled errors
    const handleError = (event) => {
      console.error("Global error caught:", event.error);
      // Prevent the default browser error handling
      event.preventDefault();
    };

    const handleUnhandledRejection = (event) => {
      console.error("Unhandled promise rejection:", event.reason);
      // Prevent the default browser error handling
      event.preventDefault();
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, []);
  
  return (
    <ErrorBoundary>
      <div className="relative">
        {/* Left Side Border */}
        <div
          className="fixed left-0 w-3 z-50"
          style={{
            top: "138.48px",
            height: "calc(100vh - 138.48px)",
            background:
              "linear-gradient(180deg, #FDF6F0 0%, #FEF9E7 50%, #FDF6F0 100%)",
          }}
        ></div>

        {/* Right Side Border */}
        <div
          className="fixed right-0 w-3 z-50"
          style={{
            top: "138.48px",
            height: "calc(100vh - 138.48px)",
            background:
              "linear-gradient(180deg, #FDF6F0 0%, #FEF9E7 50%, #FDF6F0 100%)",
          }}
        ></div>

        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <CustomCursor />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/events" element={<UpcomingEvents />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blind-mixers" element={<BlindMixers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/matches" element={<Matches />} />
            
            {/* Legal Routes - Updated to use Privacy component */}
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms-conditions" element={<Terms />} />
            <Route path="/privacy-policy" element={<Privacy />} />

            {/* Onboarding Routes */}
            <Route path="/onboarding/profile-setup" element={<ProfileSetupScreen />} />
            <Route path="/onboarding/photos" element={<PhotoGalleryScreen />} />
            <Route path="/onboarding/interests" element={<InterestsValuesScreen />} />
            <Route path="/onboarding/complete" element={<ProfileCompleteScreen />} />
          </Routes>
        </Router>
      </div>
    </ErrorBoundary>
  );
}

export default App;