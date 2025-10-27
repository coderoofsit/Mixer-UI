import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../../components/layout/OnboardingLayout";
import LandingHeader from "../../components/layout/LandingHeader";
import Footer from "../../components/layout/Footer";

const PhotoGalleryScreen = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState(Array(6).fill(null));
  const [isDragging, setIsDragging] = useState(false);

  const handlePhotoUpload = (index, file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhotos = [...photos];
        newPhotos[index] = e.target.result;
        setPhotos(newPhotos);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (index, event) => {
    const file = event.target.files?.[0];
    if (file) {
      handlePhotoUpload(index, file);
    }
  };

  const handleDrop = (index, event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handlePhotoUpload(index, file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removePhoto = (index) => {
    const newPhotos = [...photos];
    newPhotos[index] = null;
    setPhotos(newPhotos);
  };

  const handleContinue = () => {
    // TODO: Upload photos to backend
    console.log("Photos:", photos.filter(p => p !== null));
    navigate("/onboarding/interests");
  };

  const handleSkip = () => {
    navigate("/onboarding/interests");
  };

  return (
    <>
      <LandingHeader />
      <OnboardingLayout
        title="Show Your Best Self"
        subtitle="Add photos to your profile"
      >
      <div className="px-6 py-8">
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
            Upload up to 6 photos. Your first photo will be your main profile
            picture. Drag to reorder.
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {photos.map((photo, index) => (
            <div key={index} className="relative">
              <input
                type="file"
                id={`photo-${index}`}
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileSelect(index, e)}
              />

              <label
                htmlFor={`photo-${index}`}
                className={`block aspect-square rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 ${
                  isDragging
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-300 hover:border-purple-400"
                }`}
                onDrop={(e) => handleDrop(index, e)}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                style={{
                  backgroundColor: photo ? "transparent" : "#F8F4F7",
                }}
              >
                {photo ? (
                  <div className="relative w-full h-full">
                    {/* Blurred background */}
                    <img
                      src={photo}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl blur-xl scale-110"
                      aria-hidden="true"
                    />
                    {/* Main image */}
                    <img
                      src={photo}
                      alt={`Upload ${index + 1}`}
                      className="relative w-full h-full object-contain rounded-2xl"
                    />
                    {index === 0 && (
                      <div
                        className="absolute top-2 left-2 px-2 py-1 rounded text-xs font-semibold text-white z-10"
                        style={{ backgroundColor: "#5D1751" }}
                      >
                        Main
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removePhoto(index);
                      }}
                      className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-50 transition-colors duration-200 z-10"
                    >
                      <svg
                        className="w-5 h-5 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                    <svg
                      className="w-12 h-12 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <p className="text-xs">Add Photo</p>
                  </div>
                )}
              </label>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div
          className="p-5 rounded-2xl space-y-3"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
        >
          <button
            onClick={handleContinue}
            className="w-full text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
            style={{
              backgroundColor: "#4A1342",
              height: "56px",
            }}
          >
            Continue
          </button>
          <button
            onClick={handleSkip}
            className="w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-white"
            style={{
              height: "56px",
            }}
          >
            Skip for now
          </button>
        </div>
      </div>
    </OnboardingLayout>
    <Footer />
    </>
  );
};

export default PhotoGalleryScreen;

