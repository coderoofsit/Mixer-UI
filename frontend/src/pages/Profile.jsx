import React, { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import LandingHeader from "../components/layout/LandingHeader";
import Footer from "../components/layout/Footer";
import ImageUpload from "../components/ui/ImageUpload";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { authApi } from "../services/authApi";
import authService from "../services/authService";
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
  HEIGHT_OPTIONS,
  INTERESTS_OPTIONS,
  VALUES_OPTIONS,
} from "../utils/profileOptions";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [fetchingProfile, setFetchingProfile] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [pendingFiles, setPendingFiles] = useState([]);
  const [profileData, setProfileData] = useState({
    lookingFor: "",
    gender: "",
    images: [],
    dateOfBirth: "",
    height: "",
    interestedIn: [],
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

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
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

        setProfileData({
          lookingFor: userData.lookingFor || "",
          gender: userData.gender || "",
          images: userData.images || [],
          dateOfBirth: formattedDOB,
          height: userData.height || "",
          interestedIn: userData.interestedIn || [],
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
        });
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

  const handleFilesSelect = (newFiles, replace = false) => {
    if (replace) {
      setPendingFiles(newFiles);
    } else {
      setPendingFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleUploadAll = async () => {
    if (pendingFiles.length === 0) return;

    setUploading(true);
    try {
      const result = await authApi.uploadProfileImages(pendingFiles);
      
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

        setPendingFiles([]);
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

    if (profileData.dateOfBirth) {
      const birthDate = new Date(profileData.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        newErrors.dateOfBirth = "You must be at least 18 years old";
      }
    }

    if (profileData.lookingFor && profileData.lookingFor.length > 500) {
      newErrors.lookingFor = "Maximum 500 characters allowed";
    }

    setErrors(newErrors);
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
      const updateData = {
        lookingFor: profileData.lookingFor,
        gender: profileData.gender,
        dateOfBirth: profileData.dateOfBirth,
        height: profileData.height,
        interestedIn: profileData.interestedIn,
        sexuality: profileData.sexuality,
        relationshipType: profileData.relationshipType,
        ethnicity: profileData.ethnicity,
        familyPlans: profileData.familyPlans,
        drinking: profileData.drinking,
        smoking: profileData.smoking,
        religion: profileData.religion,
        politics: profileData.politics,
        thingsILike: profileData.thingsILike,
        values: profileData.values,
      };

      Object.keys(updateData).forEach(key => {
        if (updateData[key] === "" || updateData[key] === null || 
            (Array.isArray(updateData[key]) && updateData[key].length === 0)) {
          delete updateData[key];
        }
      });

      const response = await authApi.updateProfile(updateData);

      if (response.success) {
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
                          <img
                            src={image.url}
                            alt={`Profile ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {image.isPrimary && (
                            <div className="absolute top-2 left-2 bg-teal-600 text-white text-xs font-bold px-2 py-1 rounded">
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
              {(profileData.gender || profileData.dateOfBirth || profileData.height) && (
                <Card>
                  <Card.Header>
                    <Card.Title>Basic Details</Card.Title>
                  </Card.Header>
                  <Card.Content>
                    {renderViewField("Gender", profileData.gender)}
                    {profileData.dateOfBirth && renderViewField("Birthday", formatDate(profileData.dateOfBirth))}
                    {profileData.dateOfBirth && renderViewField("Age", calculateAge(profileData.dateOfBirth))}
                    {renderViewField("Height", profileData.height)}
                  </Card.Content>
                </Card>
              )}

              {/* Dating Preferences */}
              {(profileData.interestedIn.length > 0 || profileData.sexuality || profileData.relationshipType) && (
                <Card>
                  <Card.Header>
                    <Card.Title>Dating Preferences</Card.Title>
                  </Card.Header>
                  <Card.Content>
                    {renderChips(profileData.interestedIn, "Interested In")}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Gender */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
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
                    </div>

                    {/* Birthday */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Birthday
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={profileData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200"
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
                      <select
                        name="height"
                        value={profileData.height}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200"
                      >
                        <option value="">Select height</option>
                        {HEIGHT_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
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
                          className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={profileData.interestedIn.includes(option)}
                            onChange={() => handleCheckboxChange('interestedIn', option)}
                            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
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
