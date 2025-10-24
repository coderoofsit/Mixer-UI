import React, { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import LandingHeader from "../components/layout/LandingHeader";
import Footer from "../components/layout/Footer";
import { authApi } from "../services/authApi";
import authService from "../services/authService";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [fetchingProfile, setFetchingProfile] = useState(true);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    bio: "",
    interests: [],
  });

  console.log('🎨 Profile component rendered with data:', profileData);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setFetchingProfile(true);
        console.log('📥 Fetching user profile...');
        
        const response = await authApi.getUserProfile();
        console.log('✅ Profile data received:', response);
        console.log('📊 Profile object:', response.data);
        
        if (response.success && response.data) {
          // Extract user data from nested structure
          const userData = response.data.user || response.data;
          
          console.log('👤 User data extracted:', userData);
          
          // Get user data from auth service for email
          const firebaseUser = authService.getCurrentUser();
          
          // Calculate age from dateOfBirth
          let age = "";
          if (userData.dateOfBirth) {
            const birthDate = new Date(userData.dateOfBirth);
            const today = new Date();
            let calculatedAge = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
              calculatedAge--;
            }
            age = calculatedAge.toString();
          }
          
          // Get gender value (keep as-is from backend: "Male", "Female")
          const gender = userData.gender || "";
          
          // Map interests from thingsILike or interestedIn
          const interests = userData.thingsILike || userData.interestedIn || [];
          
          console.log('🔍 Mapped profile data:', {
            name: userData.name,
            age: age,
            gender: gender,
            dateOfBirth: userData.dateOfBirth,
            interests: interests,
          });
          
          // Capitalize first letter of name for display
          const displayName = userData.name 
            ? userData.name.charAt(0).toUpperCase() + userData.name.slice(1)
            : firebaseUser?.displayName || "";
          
          const newProfileData = {
            name: displayName,
            email: userData.email || firebaseUser?.email || "",
            age: age,
            gender: gender,
            bio: userData.aboutMe || userData.about_me || "",
            interests: interests,
          };
          
          console.log('📝 Final profile data to set:', newProfileData);
          setProfileData(newProfileData);
        }
      } catch (error) {
        console.error('❌ Failed to fetch profile:', error);
        // If profile fetch fails, at least show the user's basic info from auth
        const user = authService.getCurrentUser();
        setProfileData(prev => ({
          ...prev,
          name: user?.displayName || "",
          email: user?.email || "",
        }));
      } finally {
        setFetchingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  // Debug: Log profileData when it changes
  useEffect(() => {
    console.log('🔄 Profile data state updated:', profileData);
  }, [profileData]);

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

  const handleInterestChange = (interest) => {
    setProfileData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      console.log('💾 Saving profile data...');
      
      // Prepare data for backend - only send fields that exist in the API
      const updateData = {
        name: profileData.name,
        gender: profileData.gender, // "Male", "Female", or "Other Gender"
        aboutMe: profileData.bio,
        thingsILike: profileData.interests, // Map interests to thingsILike
        // Add location field with default coordinates [0, 0]
        location: {
          type: "Point",
          coordinates: [0, 0]
        }
      };
      
      // Remove empty/undefined values (except location which is required)
      Object.keys(updateData).forEach(key => {
        if (key !== 'location' && (updateData[key] === "" || updateData[key] === undefined || updateData[key] === null)) {
          delete updateData[key];
        }
      });

      const response = await authApi.updateProfile(updateData);
      console.log('✅ Profile updated:', response);

      if (response.success) {
        setSuccessMessage("Profile updated successfully!");
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrors({ submit: response.error || "Failed to update profile" });
      }
    } catch (error) {
      console.error('❌ Failed to update profile:', error);
      setErrors({ 
        submit: error.response?.data?.message || error.message || "Failed to update profile. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  const interestOptions = [
    "Music",
    "Sports",
    "Travel",
    "Food",
    "Art",
    "Movies",
    "Books",
    "Fitness",
    "Photography",
    "Gaming",
    "Dancing",
    "Cooking",
    "Hiking",
    "Swimming",
    "Reading",
    "Writing",
    "Painting",
    "Coding",
  ];

  return (
    <>
      <LandingHeader />
      <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Profile
          </h1>
          <p className="text-gray-600">
            Make your profile stand out and attract the right matches.
          </p>
        </div>

        {fetchingProfile ? (
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-gray-600">Loading your profile...</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Debug Info - Remove after testing */}
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <p className="text-sm font-semibold text-blue-800 mb-2">Debug - Profile Data:</p>
              <pre className="text-xs text-blue-700 overflow-auto">
                {JSON.stringify(profileData, null, 2)}
              </pre>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg">
                {successMessage}
              </div>
            )}

            {/* Error Message */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {errors.submit}
              </div>
            )}

            {/* Basic Information */}
            <Card>
            <Card.Header>
              <Card.Title>Basic Information</Card.Title>
              <Card.Description>Tell others about yourself</Card.Description>
            </Card.Header>
            <Card.Content className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  name="name"
                  value={profileData.name || ""}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="Enter your full name"
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={profileData.email || ""}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="Enter your email"
                  disabled
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Age"
                  name="age"
                  type="number"
                  value={profileData.age || ""}
                  onChange={handleChange}
                  error={errors.age}
                  placeholder="Your age"
                  min="18"
                  max="100"
                  disabled
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={profileData.gender || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other Gender">Other Gender</option>
                  </select>
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* Bio Section */}
          <Card>
            <Card.Header>
              <Card.Title>About You</Card.Title>
              <Card.Description>
                Write a brief description about yourself
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={profileData.bio || ""}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Tell others about yourself, your hobbies, what you're looking for..."
                />
                <p className="mt-1 text-sm text-gray-500">
                  {(profileData.bio || "").length}/500 characters
                </p>
              </div>
            </Card.Content>
          </Card>

          {/* Interests */}
          <Card>
            <Card.Header>
              <Card.Title>Interests</Card.Title>
              <Card.Description>
                Select your interests to help us find better matches
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {interestOptions.map((interest) => (
                  <label
                    key={interest}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={profileData.interests.includes(interest)}
                      onChange={() => handleInterestChange(interest)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-3 text-sm text-gray-700">
                      {interest}
                    </span>
                  </label>
                ))}
              </div>
            </Card.Content>
          </Card>

          {/* Profile Photo */}
          <Card>
            <Card.Header>
              <Card.Title>Profile Photos</Card.Title>
              <Card.Description>
                Add photos to make your profile more attractive
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((index) => (
                  <div
                    key={index}
                    className="aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <svg
                        className="mx-auto h-8 w-8 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      <p className="text-xs text-gray-500 mt-1">Add Photo</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              size="lg"
            >
              {loading ? (
                <LoadingSpinner size="sm" color="white" />
              ) : (
                "Save Changes"
              )}
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
