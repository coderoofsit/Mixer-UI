import React from 'react';

const LoadingOverlay = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 shadow-2xl flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-600 mb-4"></div>
        <p className="text-lg font-medium text-gray-900">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;

