/**
 * Profile Field Mapper
 * Maps frontend/Android field names to backend API field names
 */

/**
 * Maps frontend/Android field names to backend API field names
 * @param {Object} frontendData - Data with frontend field names
 * @returns {Object} Data with backend field names
 */
export const mapProfileFieldsToBackend = (frontendData) => {
  const backendData = {};

  // Mapping object for field transformations
  const fieldMappings = {
    // Direct mappings
    name: 'name',
    dateOfBirth: 'dateOfBirth',
    aboutMe: 'aboutMe',
    // Field name transformations (remove "selected" prefix)
    selectedGender: 'gender',
    heightController: 'height',
    selectedEthnicity: 'ethnicity',
    selectedFamilyPlans: 'familyPlans',
    selectedDrinking: 'drinking',
    selectedSmoking: 'smoking',
    selectedMarijuana: 'marijuanas', // Note: plural in backend
    selectedReligion: 'religion',
    selectedPolitics: 'politics',
    selectedThingsILike: 'thingsILike',
    selectedValues: 'values',
    notificationPermissionGranted: 'notificationPermission',
    locationPermissionGranted: 'locationPermission',
  };

  // Map and filter out null/empty values
  Object.keys(fieldMappings).forEach(frontendKey => {
    const backendKey = fieldMappings[frontendKey];
    const value = frontendData[frontendKey];
    
    // Only include if value exists and is not null/empty
    if (value !== undefined && value !== null && value !== '') {
      // For arrays, only include if not empty
      if (Array.isArray(value)) {
        if (value.length > 0) {
          backendData[backendKey] = value;
        }
      } else {
        backendData[backendKey] = value;
      }
    }
  });

  // Handle special fields that might be passed directly (like location)
  if (frontendData.location !== undefined && frontendData.location !== null) {
    backendData.location = frontendData.location;
  }

  return backendData;
};

