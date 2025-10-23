import apiClient from './apiService';

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
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put('/api/v1/auth/profile', profileData);
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },

  // Get user profile
  getUserProfile: async () => {
    try {
      const response = await apiClient.get('/api/v1/auth/profile');
      return response.data;
    } catch (error) {
      console.error('Get user profile error:', error);
      throw error;
    }
  },
};

