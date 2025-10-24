import React, { useState, useRef, useEffect } from "react";

const CustomDropdown = ({
  value,
  options,
  placeholder = "Select an option",
  onChange,
  multiSelect = false,
  label,
  maxHeight = "200px",
  enableScroll = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const handleSelect = (option) => {
    if (multiSelect) {
      const currentValues = value || [];
      const newValues = currentValues.includes(option)
        ? currentValues.filter((v) => v !== option)
        : [...currentValues, option];
      onChange(newValues);
    } else {
      onChange(option);
      setIsExpanded(false);
    }
  };

  const isSelected = (option) => {
    if (multiSelect) {
      return (value || []).includes(option);
    }
    return value === option;
  };

  const displayText = () => {
    if (multiSelect) {
      const selected = value || [];
      return selected.length > 0 ? `${selected.length} selected` : placeholder;
    }
    return value || placeholder;
  };

  // Function to render label with red asterisk
  const renderLabel = () => {
    if (!label) return null;
    
    const parts = label.split('*');
    if (parts.length > 1) {
      return (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {parts[0]}<span className="text-red-600">*</span>{parts[1] || ''}
        </label>
      );
    }
    return (
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
    );
  };

  return (
    <div className="w-full">
      {renderLabel()}
      <div
        ref={dropdownRef}
        className="relative border rounded-2xl bg-white"
        style={{ borderColor: "#D1D5DB" }}
      >
        {/* Trigger */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-3 flex items-center justify-between text-left transition-colors duration-200"
          style={{ 
            height: "56px",
            color: value ? "#000" : "#9CA3AF"
          }}
        >
          <span className="text-sm">{displayText()}</span>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
              isExpanded ? "transform rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isExpanded && (
          <div
            className={`relative z-50 w-full bg-white border border-gray-300 rounded-2xl shadow-lg mt-1 ${enableScroll ? 'overflow-y-auto' : ''}`}
            style={{ 
              maxHeight: enableScroll ? maxHeight : "auto",
              overflow: enableScroll ? undefined : "hidden"
            }}
          >
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                className={`px-3 py-2 cursor-pointer transition-colors duration-150 flex items-center justify-between ${
                  isSelected(option)
                    ? "bg-purple-50"
                    : "hover:bg-gray-50"
                } ${index !== 0 ? "border-t border-gray-200" : ""}`}
                style={{
                  backgroundColor: isSelected(option) ? "#F3E8FF" : undefined,
                }}
              >
                <span
                  className={`text-sm ${
                    isSelected(option)
                      ? "font-semibold"
                      : "font-normal"
                  }`}
                  style={{ color: isSelected(option) ? "#5D1751" : "#000" }}
                >
                  {option}
                </span>
                {isSelected(option) && (
                  <svg
                    className="w-4 h-4"
                    style={{ color: "#5D1751" }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;

