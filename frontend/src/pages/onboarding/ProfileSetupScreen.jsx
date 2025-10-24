import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../../components/layout/OnboardingLayout";
import CustomDropdown from "../../components/ui/CustomDropdown";
import { authApi } from "../../services/authApi";
import { mapProfileFieldsToBackend } from "../../utils/profileFieldMapper";
import LandingHeader from "../../components/layout/LandingHeader";
import Footer from "../../components/layout/Footer";

const ProfileSetupScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    month: "",
    day: "",
    year: "",
    gender: "",
    heightFeet: "",
    heightInches: "",
    vibe: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Generate month, day, year options
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const days = Array.from({ length: 31 }, (_, i) => 
    (i + 1).toString().padStart(2, '0')
  );

  const years = Array.from({ length: 100 }, (_, i) => 
    (2024 - i).toString()
  );

  const genders = ["Male", "Female", "Other Gender"];

  const heightFeet = ["3 ft", "4 ft", "5 ft", "6 ft", "7 ft", "8 ft"];

  const heightInches = Array.from({ length: 12 }, (_, i) => `${i} in`);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateAge = () => {
    if (!formData.month || !formData.day || !formData.year) {
      return false;
    }

    const birthDate = new Date(
      parseInt(formData.year),
      parseInt(formData.month) - 1,
      parseInt(formData.day)
    );

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

    if (!formData.month || !formData.day || !formData.year) {
      newErrors.dob = "Please select your date of birth";
    } else if (!validateAge()) {
      newErrors.dob = "You must be at least 21 years old";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Format data for backend
      const dateOfBirth = `${formData.year}-${formData.month}-${formData.day}`;
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

      console.log('📤 Sending profile data to backend:', profileData);

      // Call backend API
      const result = await authApi.updateProfile(profileData);

      console.log('✅ Profile update response:', result);

      if (result.success) {
        console.log('✅ Profile updated successfully');
        navigate("/onboarding/photos");
      } else {
        setErrors({ submit: result.error || 'Profile update failed' });
      }
    } catch (error) {
      console.error('❌ Failed to update profile:', error);
      setErrors({ 
        submit: error.response?.data?.message || error.message || 'Failed to update profile. Please try again.' 
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
      <div className="px-6 py-8 space-y-6 lg:px-8">
        {/* Name Field */}
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

          <div className="grid grid-cols-3 gap-2">
            <CustomDropdown
              value={formData.month}
              options={months.map(m => m.label)}
              placeholder="Month"
              onChange={(value) => {
                const month = months.find(m => m.label === value);
                handleChange("month", month?.value || "");
              }}
            />
            <CustomDropdown
              value={formData.day}
              options={days}
              placeholder="Day"
              onChange={(value) => handleChange("day", value)}
            />
            <CustomDropdown
              value={formData.year}
              options={years}
              placeholder="Year"
              onChange={(value) => handleChange("year", value)}
            />
          </div>
          {errors.dob && (
            <p className="text-red-500 text-xs mt-2">{errors.dob}</p>
          )}
        </div>

        {/* Gender */}
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

          <div className="grid grid-cols-2 gap-2">
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

        {/* Continue Button */}
        <div
          className="p-5 rounded-2xl"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
        >
          <button
            onClick={handleContinue}
            disabled={isLoading}
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

