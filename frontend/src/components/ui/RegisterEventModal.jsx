import React, { useState } from "react";

const RegisterEventModal = ({ isOpen, onClose, event }) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleRegister = () => {
    // Open the event link in a new tab
    if (event.link) {
      window.open(event.link, "_blank", "noopener,noreferrer");
    }
    onClose();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-gray-600 hover:text-gray-900 transition-colors bg-white rounded-full p-2 shadow-md"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Event Image */}
          {event.imageUrl && (
            <div className="w-full h-80 bg-gray-50 rounded-t-xl overflow-hidden">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-4">
            {/* Event Title */}
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              {event.title}
            </h2>

            {/* Date and Time */}
            <p className="text-gray-600 mb-4 text-sm">
              {formatDate(event.date)} · {event.time}
            </p>

            {/* Ticket Section */}
            <div className="border-2 border-blue-600 rounded-lg p-3 mb-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-gray-900">
                  General Admission
                </h3>

                {/* Quantity Selector */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  >
                    <span className="text-xl font-semibold text-gray-700">−</span>
                  </button>

                  <span className="text-xl font-semibold text-gray-900 w-8 text-center">
                    {quantity}
                  </span>

                  <button
                    onClick={handleIncrement}
                    className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors"
                  >
                    <span className="text-xl font-semibold text-white">+</span>
                  </button>
                </div>
              </div>

              {/* Price Info */}
              <div className="space-y-0.5">
                <p className="text-base font-semibold text-gray-900">Free</p>
                <p className="text-xs text-gray-600">
                  Sales end on {formatDate(event.date)}
                </p>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-end mb-3">
              <span className="text-xl font-bold text-gray-900">$0.00</span>
            </div>

            {/* Register Button */}
            <button
              onClick={handleRegister}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors text-base"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterEventModal;

