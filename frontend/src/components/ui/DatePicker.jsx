import React, { useState, useRef, useEffect } from 'react';

const DatePicker = ({ 
  value = '',           // MM-DD-YYYY string
  onChange,             // Callback with MM-DD-YYYY string
  placeholder = 'MM-DD-YYYY',
  className = '',
  minAge = null         // Optional min age validation (e.g., 18, 21)
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const calendarRef = useRef(null);

  // Parse MM-DD-YYYY to local Date
  const parseDate = (dateString) => {
    if (!dateString) return null;
    const [month, day, year] = dateString.split('-');
    if (!month || !day || !year) return null;
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };

  // Format Date to MM-DD-YYYY
  const formatDate = (date) => {
    if (!date) return '';
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  // Calculate age using local time
  const calculateAge = (birthDate) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Check if date should be disabled
  const isDateDisabled = (date) => {
    // Disable future dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date > today) return true;

    // Disable dates that don't meet minAge requirement
    if (minAge) {
      const age = calculateAge(date);
      return age < minAge;
    }
    return false;
  };

  // Get days in month (local time)
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Build calendar days array
  const buildCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      days.push({
        day,
        date,
        disabled: isDateDisabled(date)
      });
    }

    return days;
  };

  // Check if date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  // Check if date is selected
  const isSelected = (date) => {
    const selectedDate = parseDate(value);
    if (!selectedDate) return false;
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };

  // Handle date selection
  const handleDateSelect = (dayObj) => {
    if (!dayObj || dayObj.disabled) return;
    const formattedDate = formatDate(dayObj.date);
    onChange(formattedDate);
    setIsOpen(false);
  };

  // Navigate to previous month
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Navigate to next month
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Handle month selection
  const handleMonthSelect = (monthIndex) => {
    setCurrentMonth(monthIndex);
    setShowMonthPicker(false);
  };

  // Handle year selection
  const handleYearSelect = (year) => {
    setCurrentYear(year);
    setShowYearPicker(false);
  };

  // Generate year range (100 years back from current year)
  const generateYearRange = () => {
    const currentYearNow = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 100; i++) {
      years.push(currentYearNow - i);
    }
    return years;
  };

  // Initialize calendar to selected date's month/year or current
  useEffect(() => {
    if (value && isOpen) {
      const selectedDate = parseDate(value);
      if (selectedDate) {
        setCurrentMonth(selectedDate.getMonth());
        setCurrentYear(selectedDate.getFullYear());
      }
    }
  }, [isOpen]);

  // Click outside to close calendar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const calendarDays = buildCalendarDays();

  return (
    <div className={`relative ${className}`} ref={calendarRef}>
      {/* Input Field with Calendar Icon */}
      <div className="relative">
        <input
          type="text"
          value={value}
          onClick={() => setIsOpen(!isOpen)}
          readOnly
          placeholder={placeholder}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 cursor-pointer bg-white"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-80">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowMonthPicker(!showMonthPicker);
                  setShowYearPicker(false);
                }}
                className="font-semibold text-gray-900 hover:bg-gray-100 px-2 py-1 rounded transition-colors"
              >
                {monthNames[currentMonth]}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowYearPicker(!showYearPicker);
                  setShowMonthPicker(false);
                }}
                className="font-semibold text-gray-900 hover:bg-gray-100 px-2 py-1 rounded transition-colors"
              >
                {currentYear}
              </button>
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Month Picker */}
          {showMonthPicker && (
            <div className="grid grid-cols-3 gap-2 mb-4">
              {monthNames.map((month, index) => (
                <button
                  key={month}
                  type="button"
                  onClick={() => handleMonthSelect(index)}
                  className={`
                    py-2 px-3 rounded-lg text-sm font-medium transition-colors
                    ${currentMonth === index ? 'bg-teal-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}
                  `}
                >
                  {month.substring(0, 3)}
                </button>
              ))}
            </div>
          )}

          {/* Year Picker */}
          {showYearPicker && (
            <div className="h-64 overflow-y-auto mb-4 border border-gray-200 rounded-lg">
              <div className="grid grid-cols-3 gap-1 p-2">
                {generateYearRange().map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => handleYearSelect(year)}
                    className={`
                      py-2 px-3 rounded-lg text-sm font-medium transition-colors
                      ${currentYear === year ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-900'}
                    `}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Day Names and Calendar Grid - Only show when not picking month/year */}
          {!showMonthPicker && !showYearPicker && (
            <>
              {/* Day Names */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-gray-600 py-1">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days Grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((dayObj, index) => {
                  if (!dayObj) {
                    return <div key={`empty-${index}`} className="aspect-square" />;
                  }

                  const selected = isSelected(dayObj.date);
                  const today = isToday(dayObj.date);
                  const disabled = dayObj.disabled;

                  return (
                    <button
                      key={`day-${dayObj.day}`}
                      type="button"
                      onClick={() => handleDateSelect(dayObj)}
                      disabled={disabled}
                      className={`
                        aspect-square flex items-center justify-center rounded-lg text-sm
                        transition-colors
                        ${disabled ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}
                        ${selected ? 'bg-teal-600 text-white font-semibold' : ''}
                        ${!selected && today ? 'bg-teal-50 font-semibold' : ''}
                        ${!selected && !today && !disabled ? 'hover:bg-gray-100' : ''}
                      `}
                    >
                      {dayObj.day}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* Helper Text */}
          {minAge && (
            <div className="mt-3 text-xs text-gray-500 text-center">
              Must be at least {minAge} years old
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DatePicker;

