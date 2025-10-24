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
    auth.onAuthStateChanged((user) => {
      this.currentUser = user;
      if (user) {
        // User is signed in
        localStorage.setItem('user', JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          isAnonymous: user.isAnonymous
        }));
      } else {
        // User is signed out
        localStorage.removeItem('user');
        localStorage.removeItem('isAnonymous');
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
      console.log('🔄 Registering user with backend...');
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
    } catch (error) {
      console.error('Sign up error:', error);
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
          console.error('⚠️ Backend registration failed for Google user:', error);
          // Continue anyway - user is authenticated with Firebase
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
      throw this.handleAuthError(error);
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
          console.error('⚠️ Backend registration failed for Apple user:', error);
          // Continue anyway - user is authenticated with Firebase
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
      throw this.handleAuthError(error);
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
  async getAuthToken() {
    try {
      const user = auth.currentUser;
      if (user) {
        return await user.getIdToken();
      }
      return null;
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
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

  // Handle authentication errors
  handleAuthError(error) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return new Error('This email is already registered. Please sign in instead.');
      case 'auth/invalid-email':
        return new Error('Invalid email address.');
      case 'auth/operation-not-allowed':
        return new Error('This sign-in method is not enabled. Please contact support.');
      case 'auth/weak-password':
        return new Error('Password is too weak. Please use at least 6 characters.');
      case 'auth/user-disabled':
        return new Error('This account has been disabled. Please contact support.');
      case 'auth/user-not-found':
        return new Error('No account found with this email.');
      case 'auth/wrong-password':
        return new Error('Incorrect password. Please try again.');
      case 'auth/too-many-requests':
        return new Error('Too many failed attempts. Please try again later.');
      case 'auth/popup-closed-by-user':
        return new Error('Sign-in popup was closed. Please try again.');
      case 'auth/popup-blocked':
        return new Error('Sign-in popup was blocked. Please allow popups and try again.');
      case 'auth/cancelled-popup-request':
        return new Error('Sign-in was cancelled. Please try again.');
      default:
        return new Error(error.message || 'Authentication failed. Please try again.');
    }
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;
