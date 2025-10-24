// Firebase Authentication Service
import {
  auth,
  googleProvider,
  appleProvider,
  signInWithPopup,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  sendPasswordResetEmail
} from '../config/firebase';
import { authApi } from './authApi';

class AuthService {
  constructor() {
    this.currentUser = null;
    
    // Listen for auth state changes
    auth.onAuthStateChanged(async (user) => {
      this.currentUser = user;
      if (user) {
        // User is signed in - store user data and tokens
        try {
          const idToken = await user.getIdToken(true);
          const refreshToken = user.refreshToken;
          
          // Store user data
          localStorage.setItem('user', JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            isAnonymous: user.isAnonymous
          }));
          
          // Store Firebase tokens
          localStorage.setItem('firebaseIdToken', idToken);
          localStorage.setItem('firebaseRefreshToken', refreshToken);
          localStorage.setItem('tokenTimestamp', Date.now().toString());
          
          console.log('🔑 Tokens stored in localStorage');
        } catch (error) {
          console.error('Error storing tokens:', error);
        }
      } else {
        // User is signed out - clear all auth data
        localStorage.removeItem('user');
        localStorage.removeItem('isAnonymous');
        localStorage.removeItem('firebaseIdToken');
        localStorage.removeItem('firebaseRefreshToken');
        localStorage.removeItem('tokenTimestamp');
      }
    });
  }

  // Sign in with Email and Password
  async signInWithEmail(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log({user});
      localStorage.setItem('accessToken', user?.accessToken);
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      };
    } catch (error) {
      console.error('Sign in error:', error);
      // Always pass Firebase errors through handleAuthError
      throw this.handleAuthError(error);
    }
  }

  // Sign up with Email and Password
  async signUpWithEmail(userData) {
    try {
      const { email, password, fullName } = userData;
      
      // Step 1: Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log({user});
      localStorage.setItem('accessToken', user?.accessToken);

      // Update profile with display name
      if (fullName) {
        await updateProfile(user, {
          displayName: fullName
        });
      }

      // Step 2: Get Firebase ID token
      const idToken = await user.getIdToken(true);

      // Step 3: Register with backend
      console.log('🔄 Registering user with backend...');
      try {
        const registrationResult = await authApi.registerUser(email, idToken);

        if (registrationResult.success) {
          // Store userId in localStorage
          localStorage.setItem('userId', registrationResult.userId);
          console.log('✅ Registration successful! User ID:', registrationResult.userId);
          
          return {
            uid: user.uid,
            email: user.email,
            displayName: fullName || user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            userId: registrationResult.userId,
            isNewUser: true,
          };
        } else {
          throw new Error(registrationResult.error || 'Backend registration failed');
        }
      } catch (backendError) {
        // Backend registration failed - delete the Firebase user and throw error
        console.error('❌ Backend registration failed, cleaning up Firebase user...');
        await user.delete();
        throw backendError;
      }
    } catch (error) {
      console.error('Sign up error:', error);
      // Check if it's a Firebase error (has a 'code' property like 'auth/email-already-in-use')
      if (error?.code && error.code.startsWith('auth/')) {
        throw this.handleAuthError(error);
      }
      // If it's already a processed Error object (from backend), throw it as is
      if (error instanceof Error) {
        throw error;
      }
      // Otherwise, handle as Firebase error
      throw this.handleAuthError(error);
    }
  }

  // Sign in with Google
  async signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if this is a new user
      const isNewUser = result._tokenResponse?.isNewUser || false;

      // Register new users with backend
      if (isNewUser) {
        try {
          const idToken = await user.getIdToken(true);
          console.log('🔄 Registering new Google user with backend...');
          const registrationResult = await authApi.registerUser(user.email, idToken);
          
          if (registrationResult.success) {
            localStorage.setItem('userId', registrationResult.userId);
            console.log('✅ Google user registration successful! User ID:', registrationResult.userId);
          }
        } catch (error) {
          console.error('❌ Backend registration failed for Google user:', error);
          // Delete Firebase user and throw error
          await user.delete();
          await firebaseSignOut(auth);
          throw error;
        }
      }

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        isNewUser
      };
    } catch (error) {
      console.error('Google sign in error:', error);
      // Check if it's a Firebase error (has a 'code' property like 'auth/...')
      if (error?.code && error.code.startsWith('auth/')) {
        throw this.handleAuthError(error);
      }
      // If it's already a processed Error object (from backend), throw it as is
      throw error;
    }
  }

  // Sign in with Apple
  async signInWithApple() {
    try {
      const result = await signInWithPopup(auth, appleProvider);
      const user = result.user;

      // Check if this is a new user
      const isNewUser = result._tokenResponse?.isNewUser || false;

      // Register new users with backend
      if (isNewUser) {
        try {
          const idToken = await user.getIdToken(true);
          console.log('🔄 Registering new Apple user with backend...');
          const registrationResult = await authApi.registerUser(user.email, idToken);
          
          if (registrationResult.success) {
            localStorage.setItem('userId', registrationResult.userId);
            console.log('✅ Apple user registration successful! User ID:', registrationResult.userId);
          }
        } catch (error) {
          console.error('❌ Backend registration failed for Apple user:', error);
          // Delete Firebase user and throw error
          await user.delete();
          await firebaseSignOut(auth);
          throw error;
        }
      }

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        isNewUser
      };
    } catch (error) {
      console.error('Apple sign in error:', error);
      // Check if it's a Firebase error (has a 'code' property like 'auth/...')
      if (error?.code && error.code.startsWith('auth/')) {
        throw this.handleAuthError(error);
      }
      // If it's already a processed Error object (from backend), throw it as is
      throw error;
    }
  }

  // Sign in anonymously
  async signInAnonymously() {
    try {
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;

      localStorage.setItem('isAnonymous', 'true');

      return {
        uid: user.uid,
        email: null,
        displayName: 'Guest User',
        photoURL: null,
        isAnonymous: true
      };
    } catch (error) {
      console.error('Anonymous sign in error:', error);
      throw this.handleAuthError(error);
    }
  }

  // Sign out
  async signOut() {
    try {
      await firebaseSignOut(auth);
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      localStorage.removeItem('isAnonymous');
      localStorage.removeItem('firebaseIdToken');
      localStorage.removeItem('firebaseRefreshToken');
      localStorage.removeItem('tokenTimestamp');
      localStorage.removeItem('userId');
      console.log('🚪 User signed out and tokens cleared');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  // Send password reset email
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent to:', email);
      return {
        success: true,
        message: 'Password reset email sent successfully'
      };
    } catch (error) {
      console.error('Password reset error:', error);
      throw this.handleAuthError(error);
    }
  }

  // Get current user
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : this.currentUser;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!auth.currentUser || !!localStorage.getItem('user');
  }

  // Check if current user is anonymous
  isAnonymousUser() {
    return auth.currentUser?.isAnonymous || localStorage.getItem('isAnonymous') === 'true';
  }

  // Get auth token
  async getAuthToken(forceRefresh = false) {
    try {
      // Try to get from localStorage first if not forcing refresh
      if (!forceRefresh) {
        const storedToken = localStorage.getItem('firebaseIdToken');
        const tokenTimestamp = localStorage.getItem('tokenTimestamp');
        
        if (storedToken && tokenTimestamp) {
          // Check if token is less than 55 minutes old (Firebase tokens expire in 60 minutes)
          const tokenAge = Date.now() - parseInt(tokenTimestamp);
          const fiftyFiveMinutes = 55 * 60 * 1000;
          
          if (tokenAge < fiftyFiveMinutes) {
            console.log('🔑 Using cached token from localStorage');
            return storedToken;
          } else {
            console.log('🔄 Token expired, refreshing...');
          }
        }
      }
      
      // Get fresh token from Firebase
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken(true);
        const refreshToken = user.refreshToken;
        
        // Store the new tokens
        localStorage.setItem('firebaseIdToken', token);
        localStorage.setItem('firebaseRefreshToken', refreshToken);
        localStorage.setItem('tokenTimestamp', Date.now().toString());
        
        console.log('🔑 Fresh token retrieved and stored');
        return token;
      }
      return null;
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  }

  // Get refresh token
  getRefreshToken() {
    return localStorage.getItem('firebaseRefreshToken');
  }

  // Check if token is valid (not expired)
  isTokenValid() {
    const token = localStorage.getItem('firebaseIdToken');
    const tokenTimestamp = localStorage.getItem('tokenTimestamp');
    
    if (!token || !tokenTimestamp) {
      return false;
    }
    
    // Check if token is less than 55 minutes old
    const tokenAge = Date.now() - parseInt(tokenTimestamp);
    const fiftyFiveMinutes = 55 * 60 * 1000;
    
    return tokenAge < fiftyFiveMinutes;
  }

  // Check if user profile is complete
  async checkProfileCompletion() {
    try {
      console.log('🔍 Checking profile completion...');
      const response = await authApi.getUserProfile();
      
      console.log('📋 Profile response:', response);

      // Get the actual profile data from the response (nested under data.user)
      const profileData = response?.data?.user || response?.data || response;
      console.log('📊 Profile data object:', profileData);

      // Check if required fields are present
      const hasName = profileData.name && profileData.name.trim() !== '';
      const hasDOB = profileData.dateOfBirth && profileData.dateOfBirth.trim() !== '';
      const hasGender = profileData.gender && profileData.gender.trim() !== '';

      const isComplete = hasName && hasDOB && hasGender;

      console.log(`✅ Profile completion check: ${isComplete ? 'COMPLETE ✓' : 'INCOMPLETE ✗'}`);
      console.log(`   - Name: ${hasName ? '✓' : '✗'} (${profileData.name || 'missing'})`);
      console.log(`   - DOB: ${hasDOB ? '✓' : '✗'} (${profileData.dateOfBirth || 'missing'})`);
      console.log(`   - Gender: ${hasGender ? '✓' : '✗'} (${profileData.gender || 'missing'})`);

      return {
        isComplete,
        profile: profileData,
        missingFields: {
          name: !hasName,
          dateOfBirth: !hasDOB,
          gender: !hasGender,
        }
      };
    } catch (error) {
      console.error('❌ Error checking profile completion:', error);
      // If profile fetch fails, assume incomplete and send to onboarding
      return {
        isComplete: false,
        profile: null,
        missingFields: {
          name: true,
          dateOfBirth: true,
          gender: true,
        }
      };
    }
  }

  // Handle authentication errors - return simple, user-friendly messages
  handleAuthError(error) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return new Error('Email Already Exists. Please Login');
      case 'auth/invalid-email':
        return new Error('Invalid Email Address');
      case 'auth/operation-not-allowed':
        return new Error('Sign-in Method Not Available');
      case 'auth/weak-password':
        return new Error('Password Too Weak');
      case 'auth/user-disabled':
        return new Error('Account Disabled');
      case 'auth/user-not-found':
        return new Error('Account Not Found');
      case 'auth/wrong-password':
        return new Error('Incorrect Password');
      case 'auth/too-many-requests':
        return new Error('Too Many Attempts. Try Again Later');
      case 'auth/popup-closed-by-user':
        return new Error('Sign-in Cancelled');
      case 'auth/popup-blocked':
        return new Error('Popup Blocked. Please Allow Popups');
      case 'auth/cancelled-popup-request':
        return new Error('Sign-in Cancelled');
      case 'auth/network-request-failed':
        return new Error('Network Error. Please Try Again');
      default:
        return new Error('Authentication Failed. Please Try Again');
    }
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;
