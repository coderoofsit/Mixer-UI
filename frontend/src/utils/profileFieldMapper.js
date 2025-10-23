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

  // Direct mappings (no transformation needed)
  if (frontendData.name !== undefined) {
    backendData.name = frontendData.name;
  }
  if (frontendData.dateOfBirth !== undefined) {
    backendData.dateOfBirth = frontendData.dateOfBirth;
  }
  if (frontendData.aboutMe !== undefined) {
    backendData.aboutMe = frontendData.aboutMe;
  }

  // Field name transformations (remove "selected" prefix)
  if (frontendData.selectedGender !== undefined) {
    backendData.gender = frontendData.selectedGender;
  }
  if (frontendData.heightController !== undefined) {
    backendData.height = frontendData.heightController;
  }
  if (frontendData.selectedEthnicity !== undefined) {
    backendData.ethnicity = frontendData.selectedEthnicity;
  }
  if (frontendData.selectedFamilyPlans !== undefined) {
    backendData.familyPlans = frontendData.selectedFamilyPlans;
  }
  if (frontendData.selectedDrinking !== undefined) {
    backendData.drinking = frontendData.selectedDrinking;
  }
  if (frontendData.selectedSmoking !== undefined) {
    backendData.smoking = frontendData.selectedSmoking;
  }
  if (frontendData.selectedMarijuana !== undefined) {
    backendData.marijuanas = frontendData.selectedMarijuana; // Note: plural in backend
  }
  if (frontendData.selectedReligion !== undefined) {
    backendData.religion = frontendData.selectedReligion;
  }
  if (frontendData.selectedPolitics !== undefined) {
    backendData.politics = frontendData.selectedPolitics;
  }
  if (frontendData.selectedThingsILike !== undefined) {
    backendData.thingsILike = frontendData.selectedThingsILike;
  }
  if (frontendData.selectedValues !== undefined) {
    backendData.values = frontendData.selectedValues;
  }
  if (frontendData.notificationPermissionGranted !== undefined) {
    backendData.notificationPermission = frontendData.notificationPermissionGranted;
  }
  if (frontendData.locationPermissionGranted !== undefined) {
    backendData.locationPermission = frontendData.locationPermissionGranted;
  }

  // Remove null/undefined values
  Object.keys(backendData).forEach(key => {
    if (backendData[key] === null || backendData[key] === undefined) {
      delete backendData[key];
    }
  });

  return backendData;
};

