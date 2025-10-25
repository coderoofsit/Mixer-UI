import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import authService from '../services/authService';
import { authApi } from '../services/authApi';

const ProfileContext = createContext();

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [primaryImage, setPrimaryImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const hasInitialized = useRef(false);

  // Extract primary image from images array
  const extractPrimaryImage = useCallback((images) => {
    if (!images || images.length === 0) return null;
    
    const primaryImg = images.find(img => img.isPrimary);
    return primaryImg?.url || images[0]?.url;
  }, []);

  // Fetch profile from API
  const fetchProfile = useCallback(async (force = false) => {
    // Don't fetch if not authenticated
    if (!authService.isAuthenticated()) {
      console.log('⚠️ Not authenticated, cannot fetch profile');
      return null;
    }

    console.log('🔄 Fetching profile from API...');
    setLoading(true);
    try {
      const response = await authApi.getUserProfile();
      console.log('📥 Profile API response:', response);
      
      if (response.success && response.data) {
        const userData = response.data.user || response.data;
        console.log('👤 User data:', userData);
        setProfileData(userData);
        
        // Extract and set primary image
        const primary = extractPrimaryImage(userData.images);
        console.log('🖼️ Primary image extracted:', primary);
        setPrimaryImage(primary);
        
        return userData;
      } else {
        console.log('❌ Profile fetch failed - no success or data');
      }
    } catch (error) {
      console.error('❌ Failed to fetch profile:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [extractPrimaryImage]);

  // Update profile data in context
  const updateProfile = useCallback((newData) => {
    console.log('🔄 Updating profile in context:', newData);
    setProfileData(newData);
    
    // Update primary image
    const primary = extractPrimaryImage(newData.images);
    console.log('🖼️ Updated primary image:', primary);
    setPrimaryImage(primary);
  }, [extractPrimaryImage]);

  // Clear profile data (on logout)
  const clearProfile = useCallback(() => {
    console.log('🧹 Clearing profile data');
    setProfileData(null);
    setPrimaryImage(null);
  }, []);

  // Initialize profile on mount if authenticated
  useEffect(() => {
    if (hasInitialized.current) {
      console.log('⏭️ Profile already initialized, skipping');
      return;
    }
    
    const initProfile = async () => {
      const isAuth = authService.isAuthenticated();
      console.log('🔍 ProfileContext initializing, isAuthenticated:', isAuth);
      
      if (isAuth) {
        console.log('✅ User is authenticated, fetching profile...');
        hasInitialized.current = true;
        await fetchProfile();
      } else {
        console.log('❌ User not authenticated, skipping profile fetch');
      }
    };
    
    initProfile();
  }, [fetchProfile]);

  const value = {
    profileData,
    primaryImage,
    loading,
    fetchProfile,
    updateProfile,
    clearProfile
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

