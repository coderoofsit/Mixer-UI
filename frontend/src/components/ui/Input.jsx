import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    { label, error, helperText, leftIcon, rightIcon, className = "", ...props },
    ref
  ) => {
    const baseClasses =
      "w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200";

    const errorClasses = error
      ? "border-red-300 focus:ring-red-500"
      : "border-gray-300 focus:ring-primary-500";

    const iconClasses = leftIcon ? "pl-10" : rightIcon ? "pr-10" : "";
    
    const heightClass = "h-[56px]";

    const classes = `${baseClasses} ${errorClasses} ${iconClasses} ${heightClass} ${className}`;

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

        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input ref={ref} className={classes} {...props} />

          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
