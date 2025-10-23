import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../../components/layout/OnboardingLayout";
import CustomDropdown from "../../components/ui/CustomDropdown";
import { authApi } from "../../services/authApi";
import { mapProfileFieldsToBackend } from "../../utils/profileFieldMapper";

const InterestsValuesScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ethnicity: "",
    familyPlans: "",
    drinking: "",
    smoking: "",
    marijuana: "",
    religiousBeliefs: "",
    politicalViews: "",
    interests: [],
    values: [],
  });

  const [isSkipping, setIsSkipping] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Options arrays
  const ethnicityOptions = [
    "Asian",
    "Black/African",
    "Hispanic/Latino",
    "Middle Eastern",
    "Native American",
    "White/Caucasian",
    "Mixed/Multiracial",
    "Other",
    "Prefer not to say",
  ];

  const familyPlansOptions = [
    "Don't want kids",
    "Want kids someday",
    "Have kids already",
    "Open to kids",
    "Not decided yet",
  ];

  const drinkingOptions = ["Never", "Rarely", "Sometimes", "Often"];
  const smokingOptions = ["Never", "Rarely", "Sometimes", "Often"];
  const marijuanaOptions = ["Never", "Rarely", "Sometimes", "Often"];

  const religiousBeliefsOptions = [
    "Christianity",
    "Islam",
    "Judaism",
    "Hinduism",
    "Buddhism",
    "Spiritual but not religious",
    "Agnostic",
    "Atheist",
    "Other",
    "Prefer not to say",
  ];

  const politicalViewsOptions = [
    "Liberal",
    "Conservative",
    "Moderate",
    "Progressive",
    "Libertarian",
    "Not political",
    "Prefer not to say",
  ];

  const interestsOptions = [
    "Gaming",
    "Fitness",
    "Travel",
    "Movies",
    "Yoga",
    "Hiking",
    "Photography",
    "Music",
    "Sports",
    "Cooking",
    "Reading",
    "Art",
    "Nature",
    "Dancing",
    "Coffee",
    "Wine",
    "Running",
    "Theater",
    "Comedy",
    "Camping",
    "Board Games",
    "Music Making",
    "Writing",
    "Climbing",
    "Surfing",
  ];

  const valuesOptions = [
    "Family-oriented",
    "Career-focused",
    "Creativity",
    "Adventure & Travel",
    "Authenticity",
    "Ambition",
    "Kindness & Empathy",
    "Sense of Humor",
    "Health & Fitness",
    "Continuous Learning",
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = async () => {
    setIsSaving(true);

    try {
      const frontendData = {
        selectedEthnicity: formData.ethnicity || null,
        selectedFamilyPlans: formData.familyPlans || null,
        selectedDrinking: formData.drinking || null,
        selectedSmoking: formData.smoking || null,
        selectedMarijuana: formData.marijuana || null,
        selectedReligion: formData.religiousBeliefs || null,
        selectedPolitics: formData.politicalViews || null,
        selectedThingsILike: formData.interests.length > 0 ? formData.interests : null,
        selectedValues: formData.values.length > 0 ? formData.values : null,
      };

      // Transform to backend field names
      const profileData = mapProfileFieldsToBackend(frontendData);

      console.log('📤 Sending interests/values data to backend:', profileData);

      const result = await authApi.updateProfile(profileData);

      console.log('✅ Interests update response:', result);

      if (result.success) {
        navigate("/onboarding/complete");
      } else {
        console.error('Profile update failed:', result.error);
        // Still navigate on error (optional fields)
        navigate("/onboarding/complete");
      }
    } catch (error) {
      console.error('❌ Failed to update interests/values:', error);
      // Still navigate on error (optional fields)
      navigate("/onboarding/complete");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSkip = async () => {
    setIsSkipping(true);
    setTimeout(() => {
      setIsSkipping(false);
      navigate("/onboarding/complete");
    }, 300);
  };

  const renderCard = (icon, title, subtitle, children) => (
    <div
      className="p-6 rounded-2xl shadow-md mb-5"
      style={{ backgroundColor: "#F8F4F7" }}
    >
      <div className="flex items-start mb-4">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
          style={{ backgroundColor: "#5D1751" }}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-black">{title}</h3>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );

  return (
    <OnboardingLayout
      title="Complete Your Profile"
      subtitle="Help us understand you better"
    >
      <div className="px-6 py-8 lg:px-8">
        {/* Info Card */}
        <div
          className="p-4 rounded-2xl mb-6 flex items-start"
          style={{ backgroundColor: "#F8F4F7" }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
            style={{ backgroundColor: "#5D1751" }}
          >
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-700">
            The more you share, the better your matches will be. All fields are
            optional and can be updated later.
          </p>
        </div>

        {/* Section: Background & Identity */}
        <h2 className="text-xl font-bold text-white mb-5">
          Background & Identity
        </h2>

        {renderCard(
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
              clipRule="evenodd"
            />
          </svg>,
          "What's Your Background?",
          "Optional",
          <CustomDropdown
            value={formData.ethnicity}
            options={ethnicityOptions}
            placeholder="Select your ethnicity"
            onChange={(value) => handleChange("ethnicity", value)}
          />
        )}

        {renderCard(
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>,
          "Let's talk about your future",
          "What are your thoughts on having a family?",
          <CustomDropdown
            value={formData.familyPlans}
            options={familyPlansOptions}
            placeholder="Select your family plans"
            onChange={(value) => handleChange("familyPlans", value)}
          />
        )}

        {/* Section: Lifestyle Habits */}
        <h2 className="text-xl font-bold text-white mb-5 mt-8">
          Lifestyle Habits
        </h2>

        {renderCard(
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>,
          "Do you drink?",
          "Optional",
          <CustomDropdown
            value={formData.drinking}
            options={drinkingOptions}
            placeholder="Select frequency"
            onChange={(value) => handleChange("drinking", value)}
          />
        )}

        {renderCard(
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
              clipRule="evenodd"
            />
          </svg>,
          "Do you smoke?",
          "Optional",
          <CustomDropdown
            value={formData.smoking}
            options={smokingOptions}
            placeholder="Select frequency"
            onChange={(value) => handleChange("smoking", value)}
          />
        )}

        {renderCard(
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
              clipRule="evenodd"
            />
          </svg>,
          "Relationship with marijuana?",
          "Optional",
          <CustomDropdown
            value={formData.marijuana}
            options={marijuanaOptions}
            placeholder="Select frequency"
            onChange={(value) => handleChange("marijuana", value)}
          />
        )}

        {/* Section: Beliefs & Views */}
        <h2 className="text-xl font-bold text-white mb-5 mt-8">
          Beliefs & Views
        </h2>

        {renderCard(
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>,
          "Religious beliefs",
          "Optional",
          <CustomDropdown
            value={formData.religiousBeliefs}
            options={religiousBeliefsOptions}
            placeholder="Select your beliefs"
            onChange={(value) => handleChange("religiousBeliefs", value)}
          />
        )}

        {renderCard(
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>,
          "Political views",
          "Optional",
          <CustomDropdown
            value={formData.politicalViews}
            options={politicalViewsOptions}
            placeholder="Select your political stance"
            onChange={(value) => handleChange("politicalViews", value)}
          />
        )}

        {/* Section: Interests & Values */}
        <h2 className="text-xl font-bold text-white mb-5 mt-8">
          Interests & Values
        </h2>

        {renderCard(
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>,
          "Your interests & hobbies",
          "Optional • Select all that apply",
          <CustomDropdown
            value={formData.interests}
            options={interestsOptions}
            placeholder="Select interests"
            onChange={(value) => handleChange("interests", value)}
            multiSelect={true}
            maxHeight="250px"
          />
        )}

        {renderCard(
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>,
          "What matters most to you?",
          "Optional • Select all that apply",
          <CustomDropdown
            value={formData.values}
            options={valuesOptions}
            placeholder="Select values"
            onChange={(value) => handleChange("values", value)}
            multiSelect={true}
            maxHeight="250px"
          />
        )}

        {/* Action Buttons */}
        <div
          className="p-5 rounded-2xl mt-8"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
        >
          <div className="flex gap-3">
            <button
              onClick={handleSkip}
              disabled={isSkipping || isSaving}
              className="flex-1 font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-white disabled:opacity-50"
              style={{
                height: "56px",
              }}
            >
              {isSkipping ? "Skipping..." : "Skip for now"}
            </button>
            <button
              onClick={handleContinue}
              disabled={isSkipping || isSaving}
              className="flex-1 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50"
              style={{
                backgroundColor: "#4A1342",
                height: "56px",
              }}
            >
              {isSaving ? "Saving..." : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default InterestsValuesScreen;

