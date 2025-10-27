import React, { useState } from 'react';

const ImageUpload = ({ 
  images = [], 
  pendingFiles = [],
  onFilesSelect, 
  onUploadAll,
  onDelete, 
  onSetPrimary, 
  maxImages = 6,
  uploading = false 
}) => {
  const [dragOver, setDragOver] = useState(null);

  const validateFile = (file) => {
    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload only JPG, PNG, or WEBP images');
      return false;
    }

    // Check file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      alert('Image size must be less than 5MB');
      return false;
    }

    return true;
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    
    const totalImages = images.length + pendingFiles.length + files.length;
    if (totalImages > maxImages) {
      alert(`You can only upload up to ${maxImages} photos total`);
      return;
    }

    const validFiles = files.filter(validateFile);
    if (validFiles.length > 0) {
      onFilesSelect(validFiles);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(null);

    const files = Array.from(e.dataTransfer.files);
    
    const totalImages = images.length + pendingFiles.length + files.length;
    if (totalImages > maxImages) {
      alert(`You can only upload up to ${maxImages} photos total`);
      return;
    }

    const validFiles = files.filter(validateFile);
    if (validFiles.length > 0) {
      onFilesSelect(validFiles);
    }
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOver(index);
  };

  const handleDragLeave = () => {
    setDragOver(null);
  };

  const handleRemovePending = (index) => {
    const newPending = pendingFiles.filter((_, i) => i !== index);
    onFilesSelect(newPending, true); // Pass true to indicate replace
  };

  const totalSlots = images.length + pendingFiles.length;

  const renderSlot = (index) => {
    // Check if this slot has an uploaded image
    if (index < images.length) {
      const image = images[index];
      return (
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
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
          
          {/* Primary Badge */}
          {image.isPrimary && (
            <div className="absolute top-2 left-2 bg-teal-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
              PRIMARY
            </div>
          )}

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 z-10">
            {!image.isPrimary && (
              <button
                type="button"
                onClick={() => onSetPrimary(index)}
                className="bg-white text-gray-800 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Set Primary
              </button>
            )}
            <button
              type="button"
              onClick={() => onDelete(index, false)}
              className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      );
    }

    // Check if this slot has a pending file
    const pendingIndex = index - images.length;
    if (pendingIndex < pendingFiles.length) {
      const file = pendingFiles[pendingIndex];
      const previewUrl = URL.createObjectURL(file);
      
      return (
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
          {/* Blurred background */}
          <img
            src={previewUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
            aria-hidden="true"
          />
          {/* Main image */}
          <img
            src={previewUrl}
            alt={`Pending ${pendingIndex + 1}`}
            className="relative w-full h-full object-contain"
          />
          
          {/* Pending Badge */}
          <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
            PENDING
          </div>

          {/* Remove Pending */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
            <button
              type="button"
              onClick={() => handleRemovePending(pendingIndex)}
              className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      );
    }

    // Empty slot for new upload
    return (
      <div
        className={`aspect-square bg-gray-50 rounded-lg border-2 border-dashed ${
          dragOver === index ? 'border-teal-500 bg-teal-50' : 'border-gray-300'
        } flex items-center justify-center cursor-pointer hover:border-teal-400 hover:bg-gray-100 transition-colors relative`}
        onDragOver={(e) => handleDragOver(e, index)}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileSelect}
          disabled={uploading}
          multiple
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="text-center pointer-events-none">
          <svg
            className="mx-auto h-10 w-10 text-gray-400"
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
          <p className="text-xs text-gray-400">or drag here</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(maxImages)].map((_, index) => (
          <div key={index}>{renderSlot(index)}</div>
        ))}
      </div>
      
      {/* Upload All Button */}
      {pendingFiles.length > 0 && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onUploadAll}
            disabled={uploading}
            className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Uploading {pendingFiles.length} photo{pendingFiles.length > 1 ? 's' : ''}...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span>Upload {pendingFiles.length} Photo{pendingFiles.length > 1 ? 's' : ''}</span>
              </>
            )}
          </button>
        </div>
      )}
      
      <div className="text-sm text-gray-600">
        <p>• Upload up to {maxImages} photos</p>
        <p>• Accepted formats: JPG, PNG, WEBP</p>
        <p>• Maximum file size: 5MB per image</p>
        <p>• Click "Set Primary" to choose your main profile photo</p>
        <p>• Select images then click "Upload" button to save them</p>
      </div>
    </div>
  );
};

export default ImageUpload;
