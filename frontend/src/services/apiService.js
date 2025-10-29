import axios from "axios";
import { auth } from "../config/firebase";

const API_BASE_URL =
	process.env.REACT_APP_API_BASE_URL ||
	"https://event-dating-backend.onrender.com";

const apiClient = axios.create({
	baseURL: API_BASE_URL,
	timeout: 60000, // 60 seconds for slow server responses
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

// Token refresh lock to prevent race conditions
let tokenRefreshPromise = null;

// Request interceptor to add Firebase token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Try to get token from localStorage first
      let token = localStorage.getItem('firebaseIdToken');
      const tokenTimestamp = localStorage.getItem('tokenTimestamp');
      
      // Check if token exists and is still valid (less than 55 minutes old)
      if (token && tokenTimestamp) {
        const tokenAge = Date.now() - parseInt(tokenTimestamp);
        const fiftyFiveMinutes = 55 * 60 * 1000;
        
        if (tokenAge >= fiftyFiveMinutes) {
          console.log('🔄 Token expired, refreshing...');
          // Token expired, get fresh token with locking mechanism
          if (!tokenRefreshPromise) {
            tokenRefreshPromise = (async () => {
              try {
                const user = auth.currentUser;
                if (user) {
                  const newToken = await user.getIdToken(true);
                  const refreshToken = user.refreshToken;
                  
                  // Update localStorage with new tokens
                  localStorage.setItem('firebaseIdToken', newToken);
                  localStorage.setItem('firebaseRefreshToken', refreshToken);
                  localStorage.setItem('tokenTimestamp', Date.now().toString());
                  
                  console.log('✅ Token refreshed successfully');
                  return newToken;
                }
                console.warn('⚠️ No current user to refresh token');
                return null;
              } finally {
                tokenRefreshPromise = null; // Release lock
              }
            })();
          }
          
          // Wait for token refresh to complete
          token = await tokenRefreshPromise;
        }
      } else {
        console.log('🔑 Getting fresh token from Firebase...');
        // No token in localStorage, get from Firebase
        const user = auth.currentUser;
        if (user) {
          token = await user.getIdToken(true);
          const refreshToken = user.refreshToken;
          
          // Store tokens in localStorage
          localStorage.setItem('firebaseIdToken', token);
          localStorage.setItem('firebaseRefreshToken', refreshToken);
          localStorage.setItem('tokenTimestamp', Date.now().toString());
          
          console.log('✅ Fresh token obtained and stored');
        } else {
          console.warn('⚠️ No authenticated user found');
        }
      }
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log(`📤 Making ${config.method?.toUpperCase()} request to ${config.url} with auth token`);
      } else {
        console.warn(`⚠️ Making ${config.method?.toUpperCase()} request to ${config.url} WITHOUT auth token`);
      }
    } catch (error) {
      console.error('❌ Error getting Firebase token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response) {
			// Server responded with error
			console.error(`❌ API Error Response (${error.response.status}):`, error.response.data);
			console.error("Request URL:", error.config?.url);
			console.error("Request Method:", error.config?.method);
			
			// Handle 401/403 - Unauthorized/Forbidden
			if (error.response.status === 401 || error.response.status === 403) {
				console.warn('🔒 Unauthorized/Forbidden access detected');
				console.warn('Error details:', error.response.data);
				
				const errorData = error.response.data;
				const errorCode = errorData?.error?.code || '';
				const errorMessage = JSON.stringify(errorData).toLowerCase();
				
				// Check for specific error codes that require logout
				const shouldLogout = 
					errorCode === 'USER_INACTIVE' ||
					errorCode === 'USER_DELETED' ||
					errorCode === 'ACCOUNT_DISABLED' ||
					errorMessage.includes('invalid or inactive user') ||
					errorMessage.includes('user not found') ||
					errorMessage.includes('account disabled') ||
					errorMessage.includes('invalid token') || 
					errorMessage.includes('token expired') ||
					errorMessage.includes('no token');
				
				if (shouldLogout) {
					console.warn('🔒 User inactive/invalid or token issue - logging out');
					
					// Clear all authentication data
					localStorage.removeItem('user');
					localStorage.removeItem('firebaseIdToken');
					localStorage.removeItem('firebaseRefreshToken');
					localStorage.removeItem('tokenTimestamp');
					localStorage.removeItem('userId');
					localStorage.removeItem('isAnonymous');
					localStorage.removeItem('returnToAfterOnboarding');
					
					// Sign out from Firebase
					try {
						await auth.signOut();
						console.log('✅ Signed out from Firebase');
					} catch (signOutError) {
						console.error('Error signing out from Firebase:', signOutError);
					}
					
					// Redirect to login page
					const currentPath = window.location.pathname;
					if (currentPath !== '/login' && currentPath !== '/signup') {
						console.log('🔄 Redirecting to login page...');
						window.location.href = '/login';
					}
				}
			}
		} else if (error.request) {
			// Request made but no response
			console.error("❌ API Error: No response from server");
			console.error("Request:", error.request);
		} else {
			// Error setting up request
			console.error("❌ API Error:", error.message);
		}
		return Promise.reject(error);
	},
);

export default apiClient;
