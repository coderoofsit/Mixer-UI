import React, { useState, useEffect, useRef } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import LandingHeader from "../components/layout/LandingHeader";
import Footer from "../components/layout/Footer";
import ImageUpload from "../components/ui/ImageUpload";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import DatePicker from "../components/ui/DatePicker";
import CustomDropdown from "../components/ui/CustomDropdown";
import { authApi } from "../services/authApi";
import authService from "../services/authService";
import { useProfile } from "../contexts/ProfileContext";
import {
  GENDER_OPTIONS,
  INTERESTED_IN_OPTIONS,
  // SEXUALITY_OPTIONS,
  RELATIONSHIP_OPTIONS,
  ETHNICITY_OPTIONS,
  FAMILY_PLANS_OPTIONS,
  DRINKING_OPTIONS,
  SMOKING_OPTIONS,
  RELIGION_OPTIONS,
  POLITICS_OPTIONS,
  INTERESTS_OPTIONS,
  VALUES_OPTIONS,
} from "../utils/profileOptions";

const Profile = () => {
  const { updateProfile: updateProfileContext } = useProfile();
  const [loading, setLoading] = useState(false);
  const [fetchingProfile, setFetchingProfile] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [pendingFiles, setPendingFiles] = useState([]);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    lookingFor: "",
    gender: "",
    images: [],
    dateOfBirth: "",
    displayDateOfBirth: "", // For MM-DD-YYYY display in edit mode
    height: "",
    heightFeet: "",
    heightInches: "",
    interestedIn: "", // Changed from array to string for single select
    sexuality: "",
    relationshipType: "",
    ethnicity: "",
    familyPlans: "",
    drinking: "",
    smoking: "",
    religion: "",
    politics: "",
    thingsILike: [],
    values: [],
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Refs for scrolling to error fields
  const nameRef = useRef(null);
  const genderRef = useRef(null);
  const dateOfBirthRef = useRef(null);

  // Helper function to format date to MM-DD-YYYY for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  // Helper function to convert YYYY-MM-DD to MM-DD-YYYY
  const convertToDisplayDate = (isoDate) => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${month}-${day}-${year}`;
  };

  // Helper function to convert MM-DD-YYYY to YYYY-MM-DD
  const convertToISODate = (displayDate) => {
    if (!displayDate) return "";
    const [month, day, year] = displayDate.split("-");
    return `${year}-${month}-${day}`;
  };

  // Helper function to calculate age
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "";
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return `${age} years old`;
  };

  // Helper function to parse height string (e.g., "5'10"") into feet and inches
  const parseHeight = (heightString) => {
    if (!heightString) return { feet: "", inches: "" };
    const match = heightString.match(/^(\d+)'(\d+)"$/);
    if (match) {
      return {
        feet: `${match[1]} ft`,
        inches: `${match[2]} in`
      };
    }
    return { feet: "", inches: "" };
  };

  // Helper function to combine feet and inches into height string (e.g., "5'10"")
  const combineHeight = (feet, inches) => {
    if (!feet || !inches) return "";
    const feetNum = feet.replace(' ft', '');
    const inchesNum = inches.replace(' in', '');
    return `${feetNum}'${inchesNum}"`;
  };

  // Helper function to format array
  const formatArray = (arr) => {
    if (!arr || arr.length === 0) return "";
    return arr.join(", ");
  };

  // Fetch profile data on component mount
    const fetchProfile = async () => {
      try {
        setFetchingProfile(true);
        const response = await authApi.getUserProfile();
        
        if (response.success && response.data) {
          const userData = response.data.user || response.data;
          
        // Format dateOfBirth for date input (YYYY-MM-DD)
        let formattedDOB = "";
          if (userData.dateOfBirth) {
          const date = new Date(userData.dateOfBirth);
          formattedDOB = date.toISOString().split('T')[0];
        }

        const parsedHeight = parseHeight(userData.height || "");
        
        // Convert interestedIn from array to string (take first element if array)
        let interestedInValue = "";
        if (Array.isArray(userData.interestedIn) && userData.interestedIn.length > 0) {
          interestedInValue = userData.interestedIn[0];
        } else if (typeof userData.interestedIn === 'string') {
          interestedInValue = userData.interestedIn;
        }

        const updatedProfile = {
          name: userData.name || "",
          email: userData.email || "",
          lookingFor: userData.lookingFor || "",
          gender: userData.gender || "",
          images: userData.images || [],
          dateOfBirth: formattedDOB,
          displayDateOfBirth: convertToDisplayDate(formattedDOB),
          height: userData.height || "",
          heightFeet: parsedHeight.feet,
          heightInches: parsedHeight.inches,
          interestedIn: interestedInValue,
          sexuality: userData.sexuality || "",
          relationshipType: userData.relationshipType || "",
          ethnicity: userData.ethnicity || "",
          familyPlans: userData.familyPlans || "",
          drinking: userData.drinking || "",
          smoking: userData.smoking || "",
          religion: userData.religion || "",
          politics: userData.politics || "",
          thingsILike: userData.thingsILike || [],
          values: userData.values || [],
        };

        setProfileData(updatedProfile);
        
        // Update context with the raw user data (not the formatted version)
        updateProfileContext(userData);
        }
      } catch (error) {
      console.error('Failed to fetch profile:', error);
      setErrors({ fetch: error.message });
      } finally {
        setFetchingProfile(false);
      }
    };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCheckboxChange = (fieldName, value) => {
    setProfileData((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName].includes(value)
        ? prev[fieldName].filter((item) => item !== value)
        : [...prev[fieldName], value],
    }));
  };

  const handleChipToggle = (fieldName, value) => {
    setProfileData((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName].includes(value)
        ? prev[fieldName].filter((item) => item !== value)
        : [...prev[fieldName], value],
    }));
  };

  const handleFilesSelect = async (newFiles, replace = false) => {
    if (newFiles.length === 0) return;

    // Automatically upload the selected files
    setUploading(true);
    try {
      const result = await authApi.uploadProfileImages(newFiles);
      
      if (result.success && result.data && result.data.uploaded) {
        const newImages = result.data.uploaded.map((upload, index) => ({
          url: upload.url,
          isPrimary: profileData.images.length === 0 && index === 0,
          uploadedAt: new Date()
        }));

        const updatedImages = [...profileData.images, ...newImages];
        
        await authApi.updateProfile({ images: updatedImages });
        
        setProfileData((prev) => ({
          ...prev,
          images: updatedImages,
        }));

        // Update context with new images
        updateProfileContext({
          ...profileData,
          images: updatedImages,
        });

        setSuccessMessage(`${newImages.length} image(s) uploaded successfully!`);
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleUploadAll = async () => {
    // This function is kept for compatibility but is no longer used
    // Images are now uploaded automatically on selection
    return;
  };

  const handleImageDelete = async (index, isPending) => {
    try {
      if (isPending) {
        const newPending = pendingFiles.filter((_, i) => i !== index);
        setPendingFiles(newPending);
      } else {
        const imageToDelete = profileData.images[index];
        const urlParts = imageToDelete.url.split('/');
        const fileWithExt = urlParts[urlParts.length - 1];
        const publicId = `profile-images/${fileWithExt.split('.')[0]}`;
        
        await authApi.deleteProfileImage(publicId);
        
        const updatedImages = profileData.images.filter((_, i) => i !== index);
        
        if (updatedImages.length > 0 && !updatedImages.some(img => img.isPrimary)) {
          updatedImages[0].isPrimary = true;
        }

        await authApi.updateProfile({ images: updatedImages });
        
        setProfileData((prev) => ({
          ...prev,
          images: updatedImages,
        }));

        // Update context with new images
        updateProfileContext({
          ...profileData,
          images: updatedImages,
        });

        setSuccessMessage("Image deleted successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error('Image delete failed:', error);
      alert('Failed to delete image. Please try again.');
    }
  };

  const handleSetPrimary = async (index) => {
    try {
      const updatedImages = profileData.images.map((img, i) => ({
        ...img,
        isPrimary: i === index,
      }));

      await authApi.updateProfile({ images: updatedImages });
      
      setProfileData((prev) => ({
        ...prev,
        images: updatedImages,
      }));

      // Update context with new images
      updateProfileContext({
        ...profileData,
        images: updatedImages,
      });

      setSuccessMessage("Primary image updated!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error('Set primary failed:', error);
      alert('Failed to set primary image. Please try again.');
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setPendingFiles([]);
    fetchProfile(); // Reset to original data
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!profileData.name || !profileData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!profileData.dateOfBirth || !profileData.displayDateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      // Validate date format and age
      const dateRegex = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-(\d{4})$/;
      if (!dateRegex.test(profileData.displayDateOfBirth)) {
        newErrors.dateOfBirth = "Invalid date format. Use MM-DD-YYYY (e.g., 01-15-1990)";
      } else if (profileData.dateOfBirth) {
        const birthDate = new Date(profileData.dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        if (age < 21) {
          newErrors.dateOfBirth = "You must be at least 21 years old";
        }
      }
    }

    if (!profileData.gender) {
      newErrors.gender = "Gender is required";
    }

    // Optional fields validation
    if (profileData.lookingFor && profileData.lookingFor.length > 500) {
      newErrors.lookingFor = "Maximum 500 characters allowed";
    }

    setErrors(newErrors);

    // Scroll to first error field
    if (Object.keys(newErrors).length > 0) {
      if (newErrors.name && nameRef.current) {
        nameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (newErrors.gender && genderRef.current) {
        genderRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (newErrors.dateOfBirth && dateOfBirthRef.current) {
        dateOfBirthRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      // Combine height feet and inches
      const combinedHeight = combineHeight(profileData.heightFeet, profileData.heightInches);
      
      // Convert interestedIn string to array for backend (backend expects array)
      const interestedInArray = profileData.interestedIn ? [profileData.interestedIn] : [];

      const updateData = {
        name: profileData.name || "",
        lookingFor: profileData.lookingFor || "",
        gender: profileData.gender || "",
        dateOfBirth: profileData.dateOfBirth || "",
        height: combinedHeight || "",
        interestedIn: interestedInArray,
        sexuality: profileData.sexuality || "",
        relationshipType: profileData.relationshipType || "",
        ethnicity: profileData.ethnicity || "",
        familyPlans: profileData.familyPlans || "",
        drinking: profileData.drinking || "",
        smoking: profileData.smoking || "",
        religion: profileData.religion || "",
        politics: profileData.politics || "",
        thingsILike: profileData.thingsILike || [],
        values: profileData.values || [],
      };

      // Filter out empty fields (empty strings, empty arrays, null, undefined)
      const filteredUpdateData = Object.entries(updateData).reduce((acc, [key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          // For arrays, only include if not empty
          if (Array.isArray(value)) {
            if (value.length > 0) {
              acc[key] = value;
            }
          } else {
            acc[key] = value;
          }
        }
        return acc;
      }, {});

      const response = await authApi.updateProfile(filteredUpdateData);

      if (response.success) {
        // Refetch the complete profile to ensure all fields are up to date
        await fetchProfile();
        
        setSuccessMessage("Profile updated successfully!");
        setIsEditMode(false);
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      setErrors({ submit: error.message || "Failed to update profile. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  // Render View Field - only show if has value
  const renderViewField = (label, value) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return null;
    }

    let displayValue = value;
    if (Array.isArray(value)) {
      displayValue = formatArray(value);
    }

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>
        <p className="text-base text-gray-900">{displayValue}</p>
      </div>
    );
  };

  // Render chip display for arrays
  const renderChips = (items, label) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-500 mb-2">{label}</label>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span
              key={item}
              className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  };

  if (fetchingProfile) {
    return (
      <>
        <LandingHeader />
        <LoadingOverlay message="Loading your profile..." />
        <Footer />
      </>
    );
  }

  return (
    <>
      <LandingHeader />
      
      {/* Loading Overlays */}
      {loading && <LoadingOverlay message="Saving profile..." />}
      {uploading && <LoadingOverlay message="Uploading images..." />}

      <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Profile
          </h1>
          <p className="text-gray-600">
                {isEditMode ? "Edit your profile information" : "View your profile"}
          </p>
        </div>

            {!isEditMode && (
              <Button
                onClick={handleEditClick}
                className="bg-teal-600 hover:bg-teal-700"
              >
                Edit Profile
              </Button>
            )}
          </div>

            {/* Success Message */}
            {successMessage && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg">
                {successMessage}
              </div>
            )}

            {/* Error Message */}
            {errors.submit && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {errors.submit}
              </div>
            )}

          {/* VIEW MODE */}
          {!isEditMode && (
            <div className="space-y-8">
              {/* Profile Photos - View Only */}
              {profileData.images.length > 0 && (
                <Card>
                  <Card.Header>
                    <Card.Title>Profile Photos</Card.Title>
                  </Card.Header>
                  <Card.Content>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {profileData.images.map((image, index) => (
                        <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          {/* Blurred background */}
                          <img
                            src={image.url}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
                            aria-hidden="true"
                          />
                          {/* Main image */}
                          <img
                            src={image.url}
                            alt={`Profile ${index + 1}`}
                            className="relative w-full h-full object-contain"
                          />
                          {image.isPrimary && (
                            <div className="absolute top-2 left-2 bg-teal-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                              PRIMARY
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card.Content>
                </Card>
              )}

              {/* What You're Looking For */}
              {profileData.lookingFor && (
                <Card>
                  <Card.Header>
                    <Card.Title>What I'm Looking For</Card.Title>
                  </Card.Header>
                  <Card.Content>
                    <p className="text-gray-900">{profileData.lookingFor}</p>
                  </Card.Content>
                </Card>
              )}

              {/* Basic Details */}
              {(profileData.name || profileData.email || profileData.gender || profileData.dateOfBirth || profileData.height) && (
                <Card>
                  <Card.Header>
                    <Card.Title>Basic Details</Card.Title>
                  </Card.Header>
                  <Card.Content>
                    {renderViewField("Name", profileData.name)}
                    {renderViewField("Email", profileData.email)}
                    {renderViewField("Gender", profileData.gender)}
                    {profileData.dateOfBirth && renderViewField("Birthday", formatDate(profileData.dateOfBirth))}
                    {profileData.dateOfBirth && renderViewField("Age", calculateAge(profileData.dateOfBirth))}
                    {renderViewField("Height", profileData.height)}
                  </Card.Content>
                </Card>
              )}

              {/* Dating Preferences */}
              {(profileData.interestedIn || profileData.sexuality || profileData.relationshipType) && (
                <Card>
                  <Card.Header>
                    <Card.Title>Dating Preferences</Card.Title>
                  </Card.Header>
                  <Card.Content>
                    {renderViewField("Interested In", profileData.interestedIn)}
                    {/* {renderViewField("Sexuality", profileData.sexuality)} */}
                    {renderViewField("Relationship Type", profileData.relationshipType)}
                  </Card.Content>
                </Card>
              )}

              {/* Background */}
              {(profileData.ethnicity || profileData.familyPlans) && (
                <Card>
                  <Card.Header>
                    <Card.Title>Background</Card.Title>
                  </Card.Header>
                  <Card.Content>
                    {renderViewField("Ethnicity", profileData.ethnicity)}
                    {renderViewField("Kids", profileData.familyPlans)}
                  </Card.Content>
                </Card>
              )}

              {/* Lifestyle Habits */}
              {(profileData.drinking || profileData.smoking || profileData.religion || profileData.politics) && (
                <Card>
                  <Card.Header>
                    <Card.Title>Lifestyle Habits</Card.Title>
                  </Card.Header>
                  <Card.Content>
                    {renderViewField("Drinking", profileData.drinking)}
                    {renderViewField("Smoking", profileData.smoking)}
                    {renderViewField("Religious Beliefs", profileData.religion)}
                    {renderViewField("Politics", profileData.politics)}
                  </Card.Content>
                </Card>
              )}

              {/* Interests & Hobbies */}
              {profileData.thingsILike.length > 0 && (
                <Card>
                  <Card.Header>
                    <Card.Title>Interests & Hobbies</Card.Title>
                  </Card.Header>
                  <Card.Content>
                    {renderChips(profileData.thingsILike, "")}
                  </Card.Content>
                </Card>
              )}

              {/* Values & Lifestyle */}
              {profileData.values.length > 0 && (
                <Card>
                  <Card.Header>
                    <Card.Title>Values & Lifestyle</Card.Title>
                  </Card.Header>
                  <Card.Content>
                    {renderChips(profileData.values, "")}
                  </Card.Content>
                </Card>
              )}
            </div>
          )}

          {/* EDIT MODE */}
          {isEditMode && (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  Save Changes
                </Button>
              </div>

              {/* Profile Photos */}
              <Card>
                <Card.Header>
                  <Card.Title>Profile Photos</Card.Title>
                  <Card.Description>
                    Add up to 6 photos. Your first photo will be your primary photo.
                  </Card.Description>
                </Card.Header>
                <Card.Content>
                  <ImageUpload
                    images={profileData.images}
                    pendingFiles={pendingFiles}
                    onFilesSelect={handleFilesSelect}
                    onUploadAll={handleUploadAll}
                    onDelete={handleImageDelete}
                    onSetPrimary={handleSetPrimary}
                    maxImages={6}
                    uploading={uploading}
                  />
                </Card.Content>
              </Card>

              {/* What You're Looking For */}
              <Card>
                <Card.Header>
                  <Card.Title>What are you looking for?</Card.Title>
                  <Card.Description>
                    Describe what you're looking for in a partner
                  </Card.Description>
                </Card.Header>
                <Card.Content>
                  <textarea
                    name="lookingFor"
                    value={profileData.lookingFor}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Describe what you're looking for in a partner..."
                    maxLength={500}
                  />
                  <div className="flex justify-between mt-1">
                    <p className="text-sm text-gray-500">
                      {profileData.lookingFor.length}/500 characters
                    </p>
                    {errors.lookingFor && (
                      <p className="text-sm text-red-600">{errors.lookingFor}</p>
                    )}
                  </div>
                </Card.Content>
              </Card>

              {/* Basic Details */}
            <Card>
            <Card.Header>
                  <Card.Title>Basic Details</Card.Title>
                  <Card.Description>Tell us about yourself</Card.Description>
            </Card.Header>
            <Card.Content className="space-y-6">
                  {/* Name */}
                  <div ref={nameRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                  name="name"
                      value={profileData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                      maxLength={50}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200"
                />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Gender */}
                <div ref={genderRef}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="gender"
                        value={profileData.gender}
                    onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200"
                  >
                    <option value="">Select gender</option>
                        {GENDER_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors.gender && (
                        <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
                      )}
                    </div>

                    {/* Birthday */}
                    <div ref={dateOfBirthRef}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Birthday <span className="text-red-600">*</span>
                      </label>
                      <DatePicker
                        value={profileData.displayDateOfBirth}
                        onChange={(newDate) => {
                          setProfileData(prev => ({
                            ...prev,
                            displayDateOfBirth: newDate,
                            dateOfBirth: convertToISODate(newDate)
                          }));
                          if (errors.dateOfBirth) {
                            setErrors(prev => ({ ...prev, dateOfBirth: '' }));
                          }
                        }}
                        placeholder="MM-DD-YYYY"
                        minAge={21}
                        className="w-full"
                      />
                      {errors.dateOfBirth && (
                        <p className="text-sm text-red-600 mt-1">{errors.dateOfBirth}</p>
                      )}
                    </div>

                    {/* Height */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Height
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <CustomDropdown
                          value={profileData.heightFeet}
                          options={["3 ft", "4 ft", "5 ft", "6 ft", "7 ft", "8 ft"]}
                          placeholder="Feet"
                          onChange={(value) => setProfileData(prev => ({ ...prev, heightFeet: value }))}
                        />
                        <CustomDropdown
                          value={profileData.heightInches}
                          options={Array.from({ length: 12 }, (_, i) => `${i} in`)}
                          placeholder="Inches"
                          onChange={(value) => setProfileData(prev => ({ ...prev, heightInches: value }))}
                        />
                      </div>
                    </div>
                  </div>
                </Card.Content>
              </Card>

              {/* Dating Preferences */}
              <Card>
                <Card.Header>
                  <Card.Title>Dating Preferences</Card.Title>
                  <Card.Description>Who are you interested in?</Card.Description>
                </Card.Header>
                <Card.Content className="space-y-6">
                  {/* Interested In */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interested In
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {INTERESTED_IN_OPTIONS.map((option) => (
                        <label
                          key={option}
                          className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                            profileData.interestedIn === option
                              ? 'border-teal-600 bg-teal-50'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="interestedIn"
                            value={option}
                            checked={profileData.interestedIn === option}
                            onChange={(e) => setProfileData(prev => ({ ...prev, interestedIn: e.target.value }))}
                            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                          />
                          <span className="ml-3 text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
                    {/* Sexuality */}
                    {/* <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sexuality
                      </label>
                      <select
                        name="sexuality"
                        value={profileData.sexuality}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200"
                      >
                        <option value="">Select sexuality</option>
                        {SEXUALITY_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div> */}

                    {/* Relationship Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Relationship Type
                      </label>
                      <select
                        name="relationshipType"
                        value={profileData.relationshipType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200"
                      >
                        <option value="">Select type</option>
                        {RELATIONSHIP_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  {/* </div> */}
                </Card.Content>
              </Card>

              {/* Background */}
              <Card>
                <Card.Header>
                  <Card.Title>Background</Card.Title>
                  <Card.Description>Tell us more about your background</Card.Description>
                </Card.Header>
                <Card.Content className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Ethnicity */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ethnicity
                      </label>
                      <select
                        name="ethnicity"
                        value={profileData.ethnicity}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200"
                      >
                        <option value="">Select ethnicity</option>
                        {ETHNICITY_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Kids / Family Plans */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kids
                      </label>
                      <select
                        name="familyPlans"
                        value={profileData.familyPlans}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200"
                      >
                        <option value="">Select option</option>
                        {FAMILY_PLANS_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                  </select>
                </div>
              </div>
            </Card.Content>
          </Card>

              {/* Lifestyle Habits */}
          <Card>
            <Card.Header>
                  <Card.Title>Lifestyle Habits</Card.Title>
                  <Card.Description>Share your lifestyle preferences</Card.Description>
            </Card.Header>
                <Card.Content className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Drinking */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Drinking
                      </label>
                      <select
                        name="drinking"
                        value={profileData.drinking}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200"
                      >
                        <option value="">Select option</option>
                        {DRINKING_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Smoking */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Smoking
                      </label>
                      <select
                        name="smoking"
                        value={profileData.smoking}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200"
                      >
                        <option value="">Select option</option>
                        {SMOKING_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Religious Beliefs */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Religious Beliefs
                      </label>
                      <select
                        name="religion"
                        value={profileData.religion}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200"
                      >
                        <option value="">Select option</option>
                        {RELIGION_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Politics */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                        Politics
                </label>
                      <select
                        name="politics"
                        value={profileData.politics}
                  onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200"
                      >
                        <option value="">Select option</option>
                        {POLITICS_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
              </div>
            </Card.Content>
          </Card>

              {/* Interests & Hobbies */}
          <Card>
            <Card.Header>
                  <Card.Title>Interests & Hobbies</Card.Title>
              <Card.Description>
                Select your interests to help us find better matches
              </Card.Description>
            </Card.Header>
            <Card.Content>
                  <div className="flex flex-wrap gap-2">
                    {INTERESTS_OPTIONS.map((interest) => (
                      <button
                    key={interest}
                        type="button"
                        onClick={() => handleChipToggle('thingsILike', interest)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          profileData.thingsILike.includes(interest)
                            ? 'bg-teal-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                      {interest}
                        {profileData.thingsILike.includes(interest) && (
                          <span className="ml-2">✓</span>
                        )}
                      </button>
                ))}
              </div>
            </Card.Content>
          </Card>

              {/* Values & Lifestyle */}
          <Card>
            <Card.Header>
                  <Card.Title>Values & Lifestyle</Card.Title>
              <Card.Description>
                    Select the values that are important to you
              </Card.Description>
            </Card.Header>
            <Card.Content>
                  <div className="flex flex-wrap gap-2">
                    {VALUES_OPTIONS.map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleChipToggle('values', value)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          profileData.values.includes(value)
                            ? 'bg-teal-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {value}
                        {profileData.values.includes(value) && (
                          <span className="ml-2">✓</span>
                        )}
                      </button>
                ))}
              </div>
            </Card.Content>
          </Card>

          {/* Save Button */}
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  Cancel
                </Button>
            <Button
              type="submit"
              disabled={loading}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  Save Changes
            </Button>
          </div>
        </form>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Profile;
