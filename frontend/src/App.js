import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Contact from "./pages/Contact";
import BlindMixers from "./pages/BlindMixers";
import UpcomingEvents from "./pages/UpcomingEvents";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CustomCursor from "./components/ui/CustomCursor";
import ProfileSetupScreen from "./pages/onboarding/ProfileSetupScreen";
import PhotoGalleryScreen from "./pages/onboarding/PhotoGalleryScreen";
import InterestsValuesScreen from "./pages/onboarding/InterestsValuesScreen";
import ProfileCompleteScreen from "./pages/onboarding/ProfileCompleteScreen";

function App() {
  return (
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
        
        {/* Onboarding Routes */}
        <Route path="/onboarding/profile-setup" element={<ProfileSetupScreen />} />
        <Route path="/onboarding/photos" element={<PhotoGalleryScreen />} />
        <Route path="/onboarding/interests" element={<InterestsValuesScreen />} />
        <Route path="/onboarding/complete" element={<ProfileCompleteScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
