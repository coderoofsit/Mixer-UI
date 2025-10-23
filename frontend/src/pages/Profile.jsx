import React, { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    bio: "",
    interests: [],
    location: "",
  });
  const [errors, setErrors] = useState({});

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

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Show success message or handle error
    }, 1000);
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

        <form onSubmit={handleSubmit} className="space-y-8">
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
                  value={profileData.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="Enter your full name"
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="Enter your email"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Age"
                  name="age"
                  type="number"
                  value={profileData.age}
                  onChange={handleChange}
                  error={errors.age}
                  placeholder="Your age"
                  min="18"
                  max="100"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={profileData.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <Input
                label="Location"
                name="location"
                value={profileData.location}
                onChange={handleChange}
                error={errors.location}
                placeholder="City, State"
              />
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
                  value={profileData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Tell others about yourself, your hobbies, what you're looking for..."
                />
                <p className="mt-1 text-sm text-gray-500">
                  {profileData.bio.length}/500 characters
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
      </div>
    </div>
  );
};

export default Profile;
