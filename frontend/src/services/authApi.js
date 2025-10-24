import apiClient from './apiService';

// Map backend errors to user-friendly messages
const getUserFriendlyMessage = (error, defaultMessage) => {
  const backendError = error.response?.data?.error || 
                      error.response?.data?.message || 
                      error.message || '';
  
  const errorLower = backendError.toLowerCase();
  
  // Map common backend errors to user-friendly messages
  if (errorLower.includes('email') && errorLower.includes('already')) {
    return 'Email Already Exists. Please Login';
  }
  if (errorLower.includes('email') && errorLower.includes('exist')) {
    return 'Email Already Exists. Please Login';
  }
  if (errorLower.includes('already registered')) {
    return 'Email Already Exists. Please Login';
  }
  if (errorLower.includes('invalid') && errorLower.includes('email')) {
    return 'Invalid Email Address';
  }
  if (errorLower.includes('invalid') && errorLower.includes('credential')) {
    return 'Invalid Credentials';
  }
  if (errorLower.includes('unauthorized')) {
    return 'Access Denied';
  }
  if (errorLower.includes('not found')) {
    return 'User Not Found';
  }
  if (errorLower.includes('network') || errorLower.includes('timeout')) {
    return 'Network Error. Please Try Again';
  }
  
  // Return default message for unknown errors
  return defaultMessage;
};

export const authApi = {
  // Register user with backend after Firebase signup
  registerUser: async (email, firebaseTokenId) => {
    try {
      const response = await apiClient.post('/api/v1/auth/register', {
        email,
        firebaseTokenId,
      });
      return response.data;
    } catch (error) {
      console.error('Register user error:', error);
      const userMessage = getUserFriendlyMessage(error, 'Registration Failed. Please Try Again');
      throw new Error(userMessage);
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put('/api/v1/auth/profile', profileData);
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      const userMessage = getUserFriendlyMessage(error, 'Profile Update Failed. Please Try Again');
      throw new Error(userMessage);
    }
  },

  // Get user profile
  getUserProfile: async () => {
    try {
      const response = await apiClient.get('/api/v1/auth/profile');
      return response.data;
    } catch (error) {
      console.error('Get user profile error:', error);
      const userMessage = getUserFriendlyMessage(error, 'Failed to Load Profile');
      throw new Error(userMessage);
    }
  },
};

