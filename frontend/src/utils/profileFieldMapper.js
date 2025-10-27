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

  // Direct mappings (include with fallback to preserve empty values)
  backendData.name = frontendData.name !== undefined ? frontendData.name : null;
  backendData.dateOfBirth = frontendData.dateOfBirth !== undefined ? frontendData.dateOfBirth : null;
  backendData.aboutMe = frontendData.aboutMe !== undefined ? frontendData.aboutMe : null;

  // Field name transformations (remove "selected" prefix, include with fallback)
  backendData.gender = frontendData.selectedGender !== undefined ? frontendData.selectedGender : null;
  backendData.height = frontendData.heightController !== undefined ? frontendData.heightController : null;
  backendData.ethnicity = frontendData.selectedEthnicity !== undefined ? frontendData.selectedEthnicity : null;
  backendData.familyPlans = frontendData.selectedFamilyPlans !== undefined ? frontendData.selectedFamilyPlans : null;
  backendData.drinking = frontendData.selectedDrinking !== undefined ? frontendData.selectedDrinking : null;
  backendData.smoking = frontendData.selectedSmoking !== undefined ? frontendData.selectedSmoking : null;
  backendData.marijuanas = frontendData.selectedMarijuana !== undefined ? frontendData.selectedMarijuana : null; // Note: plural in backend
  backendData.religion = frontendData.selectedReligion !== undefined ? frontendData.selectedReligion : null;
  backendData.politics = frontendData.selectedPolitics !== undefined ? frontendData.selectedPolitics : null;
  backendData.thingsILike = frontendData.selectedThingsILike !== undefined ? frontendData.selectedThingsILike : null;
  backendData.values = frontendData.selectedValues !== undefined ? frontendData.selectedValues : null;
  backendData.notificationPermission = frontendData.notificationPermissionGranted !== undefined ? frontendData.notificationPermissionGranted : null;
  backendData.locationPermission = frontendData.locationPermissionGranted !== undefined ? frontendData.locationPermissionGranted : null;

  // Include all fields even if empty/null - backend will handle appropriately

  return backendData;
};

