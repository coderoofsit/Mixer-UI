import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../../components/layout/OnboardingLayout";
import CustomDropdown from "../../components/ui/CustomDropdown";
import DatePicker from "../../components/ui/DatePicker";
import { authApi } from "../../services/authApi";
import { mapProfileFieldsToBackend } from "../../utils/profileFieldMapper";
import LandingHeader from "../../components/layout/LandingHeader";
import Footer from "../../components/layout/Footer";

const ProfileSetupScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "", // MM-DD-YYYY format
    gender: "",
    heightFeet: "",
    heightInches: "",
    vibe: "",
  });
  const [consentChecked, setConsentChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Refs for scrolling to error fields
  const nameRef = useRef(null);
  const dobRef = useRef(null);
  const genderRef = useRef(null);
  const consentRef = useRef(null);

  const genders = ["Male", "Female", "Other Gender"];

  const heightFeet = ["3 ft", "4 ft", "5 ft", "6 ft", "7 ft", "8 ft"];

  const heightInches = Array.from({ length: 12 }, (_, i) => `${i} in`);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Parse MM-DD-YYYY to local Date
  const parseDate = (dateString) => {
    if (!dateString) return null;
    const [month, day, year] = dateString.split('-');
    if (!month || !day || !year) return null;
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };

  // Convert MM-DD-YYYY to YYYY-MM-DD
  const convertToISODate = (displayDate) => {
    if (!displayDate) return "";
    const [month, day, year] = displayDate.split("-");
    return `${year}-${month}-${day}`;
  };

  const validateAge = () => {
    if (!formData.dateOfBirth) {
      return false;
    }

    const birthDate = parseDate(formData.dateOfBirth);
    if (!birthDate) return false;

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 21;
  };

  const handleContinue = async () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!formData.dateOfBirth) {
      newErrors.dob = "Please select your date of birth";
    } else if (!validateAge()) {
      newErrors.dob = "You must be at least 21 years old";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }

    if (!consentChecked) {
      newErrors.consent = "You must agree to the terms and conditions";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      
      // Scroll to first error field
      if (newErrors.name && nameRef.current) {
        nameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (newErrors.dob && dobRef.current) {
        dobRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (newErrors.gender && genderRef.current) {
        genderRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (newErrors.consent && consentRef.current) {
        consentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Convert MM-DD-YYYY to YYYY-MM-DD for backend
      const dateOfBirth = convertToISODate(formData.dateOfBirth);
      const height = formData.heightFeet && formData.heightInches
        ? `${formData.heightFeet.replace(' ft', '')}'${formData.heightInches.replace(' in', '')}"`
        : null;

      const frontendData = {
        name: formData.name.trim(),
        dateOfBirth,
        selectedGender: formData.gender,
        heightController: height,
        aboutMe: formData.vibe.trim() || null,
        notificationPermissionGranted: true,
      };

      // Transform to backend field names
      const profileData = mapProfileFieldsToBackend(frontendData);

      // Add location field with default coordinates [0, 0] (GeoJSON Point format)
      profileData.location = {
        type: "Point",
        coordinates: [0, 0]
      };

      console.log('📤 Sending profile data to backend:', profileData);

      // Call backend API
      const result = await authApi.updateProfile(profileData);

      console.log('✅ Profile update response:', result);

      if (result.success) {
        console.log('✅ Profile updated successfully');
        navigate("/");
      } else {
        setErrors({ submit: 'Profile Update Failed' });
      }
    } catch (error) {
      console.error('❌ Failed to update profile:', error);
      setErrors({ 
        submit: error.message || 'Profile Update Failed' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <LandingHeader />
      <OnboardingLayout
        title="Mixer Starts with"
        subtitle="Your Personal Touch"
      >
      <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-4 sm:space-y-6 lg:px-8">
        {/* Name Field */}
        <div
          ref={nameRef}
          className="p-4 sm:p-6 rounded-2xl shadow-md"
          style={{ backgroundColor: "#F8F4F7" }}
        >
          <div className="flex items-center mb-4">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
              style={{ backgroundColor: "#5D1751" }}
            >
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-black">
                What's your name?
              </h3>
            </div>
          </div>

          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="John Walker"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200"
            style={{
              borderColor: errors.name ? "#EF4444" : "#9CA3AF",
              backgroundColor: "#F8F4F7",
            }}
            onFocus={(e) => {
              if (!errors.name) e.target.style.borderColor = "#4A1342";
            }}
            onBlur={(e) => {
              if (!errors.name) e.target.style.borderColor = "#9CA3AF";
            }}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div
          ref={dobRef}
          className="p-6 rounded-2xl shadow-md"
          style={{ backgroundColor: "#F8F4F7" }}
        >
          <div className="flex items-center mb-4">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
              style={{ backgroundColor: "#5D1751" }}
            >
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-black">
                When were you born?
              </h3>
            </div>
          </div>

          <DatePicker
            value={formData.dateOfBirth}
            onChange={(value) => handleChange("dateOfBirth", value)}
            placeholder="Select your birthday"
            minAge={21}
            className="w-full"
          />
          {errors.dob && (
            <p className="text-red-500 text-xs mt-2">{errors.dob}</p>
          )}
        </div>

        {/* Gender */}
        <div
          ref={genderRef}
          className="p-6 rounded-2xl shadow-md"
          style={{ backgroundColor: "#F8F4F7" }}
        >
          <div className="flex items-center mb-4">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
              style={{ backgroundColor: "#5D1751" }}
            >
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-black">
                How do you identify?
              </h3>
            </div>
          </div>

          <CustomDropdown
            value={formData.gender}
            options={genders}
            placeholder="Select Gender"
            onChange={(value) => handleChange("gender", value)}
          />
          {errors.gender && (
            <p className="text-red-500 text-xs mt-2">{errors.gender}</p>
          )}
        </div>

        {/* Height (Optional) */}
        <div
          className="p-6 rounded-2xl shadow-md"
          style={{ backgroundColor: "#F8F4F7" }}
        >
          <div className="flex items-center mb-4">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
              style={{ backgroundColor: "#5D1751" }}
            >
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 3a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm5 2h8v2H8V5zm0 4h8v2H8V9zm0 4h8v2H8v-2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-black">
                How tall are you?
              </h3>
              <p className="text-xs text-gray-500">Optional</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1 sm:gap-2">
            <CustomDropdown
              value={formData.heightFeet}
              options={heightFeet}
              placeholder="Feet"
              onChange={(value) => handleChange("heightFeet", value)}
            />
            <CustomDropdown
              value={formData.heightInches}
              options={heightInches}
              placeholder="Inches"
              onChange={(value) => handleChange("heightInches", value)}
            />
          </div>
        </div>

        {/* Vibe (Optional) */}
        <div
          className="p-6 rounded-2xl shadow-md"
          style={{ backgroundColor: "#F8F4F7" }}
        >
          <div className="flex items-center mb-4">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
              style={{ backgroundColor: "#5D1751" }}
            >
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-black">
                What's your Vibe?
              </h3>
              <p className="text-xs text-gray-500">Optional</p>
            </div>
          </div>

          <textarea
            value={formData.vibe}
            onChange={(e) => {
              if (e.target.value.length <= 500) {
                handleChange("vibe", e.target.value);
              }
            }}
            placeholder="Write something interesting about yourself ..."
            rows={3}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 resize-none"
            style={{
              borderColor: "#9CA3AF",
              backgroundColor: "#F8F4F7",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#4A1342")}
            onBlur={(e) => (e.target.style.borderColor = "#9CA3AF")}
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {formData.vibe.length}/500 characters
          </div>
        </div>

        {/* Error Message */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {errors.submit}
          </div>
        )}

        {/* Consent Checkbox */}
        <div
          ref={consentRef}
          className="p-6 rounded-2xl shadow-md"
          style={{ backgroundColor: "#F8F4F7" }}
        >
          <div className="flex items-start">
            <input
              type="checkbox"
              id="consent"
              checked={consentChecked}
              onChange={(e) => {
                setConsentChecked(e.target.checked);
                if (errors.consent) {
                  setErrors(prev => ({ ...prev, consent: "" }));
                }
              }}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-900 focus:ring-purple-900"
              style={{ accentColor: "#4A1342" }}
            />
            <label htmlFor="consent" className="ml-3 text-sm text-gray-700">
              I agree to the{" "}
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline"
                style={{ color: "#5D1751" }}
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline"
                style={{ color: "#5D1751" }}
              >
                Privacy Policy
              </a>
              . I understand that all members undergo background checks and I consent to this process.
            </label>
          </div>
          {errors.consent && (
            <p className="text-red-500 text-xs mt-2 ml-7">{errors.consent}</p>
          )}
        </div>

        {/* Continue Button */}
        <div
          className="p-5 rounded-2xl"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
        >
          <button
            onClick={handleContinue}
            disabled={isLoading || !consentChecked}
            className="w-full text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: "#4A1342",
              height: "56px",
            }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Saving...
              </div>
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </div>
    </OnboardingLayout>
    <Footer />
    </>
  );
};

export default ProfileSetupScreen;

