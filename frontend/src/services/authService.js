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
      
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      };
    } catch (error) {
      // Don't log full error object which may contain sensitive data
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

      // Update profile with display name
      if (fullName) {
        await updateProfile(user, {
          displayName: fullName
        });
      }

      // Step 2: Get Firebase ID token
      const idToken = await user.getIdToken(true);

      // Step 3: Register with backend
      try {
        const registrationResult = await authApi.registerUser(email, idToken);

        if (registrationResult.success) {
          // Store userId in localStorage
          localStorage.setItem('userId', registrationResult.userId);
          
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
        
        // Cleanup Firebase user with retry mechanism
        try {
          await user.delete();
        } catch (deleteError) {
          // Try signing out as fallback
          try {
            await firebaseSignOut(auth);
          } catch (signOutError) {
            console.error('⚠️ Cleanup failed - manual intervention may be required');
          }
        }
        
        throw backendError;
      }
    } catch (error) {
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
          const registrationResult = await authApi.registerUser(user.email, idToken);
          
          if (registrationResult.success) {
            localStorage.setItem('userId', registrationResult.userId);
          }
        } catch (error) {
          // Cleanup Firebase user with retry mechanism
          try {
            await user.delete();
          } catch (deleteError) {
            // Try signing out as fallback
            try {
              await firebaseSignOut(auth);
            } catch (signOutError) {
              console.error('⚠️ Cleanup failed - manual intervention may be required');
            }
          }
          
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
          const registrationResult = await authApi.registerUser(user.email, idToken);
          
          if (registrationResult.success) {
            localStorage.setItem('userId', registrationResult.userId);
          }
        } catch (error) {
          // Cleanup Firebase user with retry mechanism
          try {
            await user.delete();
          } catch (deleteError) {
            // Try signing out as fallback
            try {
              await firebaseSignOut(auth);
            } catch (signOutError) {
              console.error('⚠️ Cleanup failed - manual intervention may be required');
            }
          }
          
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
      throw this.handleAuthError(error);
    }
  }

  // Sign out
  async signOut() {
    try {
      await firebaseSignOut(auth);
      
      // Clear all auth-related data from localStorage
      // Remove all possible authentication tokens and user data
      const authKeys = [
        'user',
        'authToken',
        'token',  // Used by AuthContext
        'isAnonymous',
        'firebaseIdToken',
        'firebaseRefreshToken',
        'tokenTimestamp',
        'userId'
      ];
      
      authKeys.forEach(key => localStorage.removeItem(key));
      
      // Alternatively, to be extra safe, you could clear ALL localStorage:
      // localStorage.clear();
      // But this might remove other app data you want to keep
      
    } catch (error) {
      console.error('Sign out error');
      throw error;
    }
  }

  // Send password reset email
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return {
        success: true,
        message: 'Password reset email sent successfully'
      };
    } catch (error) {
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
            return storedToken;
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
      const response = await authApi.getUserProfile();

      // Get the actual profile data from the response (nested under data.user)
      const profileData = response?.data?.user || response?.data || response;

      // Check if required fields are present
      const hasName = profileData.name && profileData.name.trim() !== '';
      const hasDOB = profileData.dateOfBirth && profileData.dateOfBirth.trim() !== '';
      const hasGender = profileData.gender && profileData.gender.trim() !== '';

      const isComplete = hasName && hasDOB && hasGender;

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

  // Format Firebase REST API error messages
  // Converts "INVALID_LOGIN_CREDENTIALS" to "Invalid Login Credentials"
  formatFirebaseMessage(message) {
    if (!message || typeof message !== 'string') {
      return 'Authentication Failed. Please Try Again';
    }
    
    // Replace underscores with spaces and convert to title case
    return message
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  // Handle authentication errors - return simple, user-friendly messages
  handleAuthError(error) {
    // Handle Firebase REST API errors with format: { error: { code: 400, message: "INVALID_LOGIN_CREDENTIALS" } }
    if (error?.error?.message) {
      const formattedMessage = this.formatFirebaseMessage(error.error.message);
      return new Error(formattedMessage);
    }

    // Handle Firebase REST API errors that might be nested differently
    if (error?.message && typeof error.message === 'string' && error.message.includes('_')) {
      // Check if it looks like a Firebase error code (all caps with underscores)
      if (error.message === error.message.toUpperCase() && error.message.includes('_')) {
        const formattedMessage = this.formatFirebaseMessage(error.message);
        return new Error(formattedMessage);
      }
    }

    // Handle standard Firebase SDK errors (auth/error-code format)
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
      case 'auth/invalid-credential':
        return new Error('Invalid Login Credentials');
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
