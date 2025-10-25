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
                  
                  return newToken;
                }
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
        // No token in localStorage, get from Firebase
        const user = auth.currentUser;
        if (user) {
          token = await user.getIdToken(true);
          const refreshToken = user.refreshToken;
          
          // Store tokens in localStorage
          localStorage.setItem('firebaseIdToken', token);
          localStorage.setItem('firebaseRefreshToken', refreshToken);
          localStorage.setItem('tokenTimestamp', Date.now().toString());
        }
      }
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting Firebase token:', error);
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
	(error) => {
		if (error.response) {
			// Server responded with error
			console.error("API Error Response:", error.response.data);
			console.error("Status:", error.response.status);
			
			// Handle 401/403 - Unauthorized/Forbidden
			if (error.response.status === 401 || error.response.status === 403) {
				console.warn('🔒 Unauthorized access - clearing tokens');
				
				// Clear all auth data but DON'T redirect
				// Let individual pages handle auth requirements
				localStorage.removeItem('user');
				localStorage.removeItem('firebaseIdToken');
				localStorage.removeItem('firebaseRefreshToken');
				localStorage.removeItem('tokenTimestamp');
				localStorage.removeItem('userId');
				localStorage.removeItem('isAnonymous');
				
				// Note: Removed automatic redirect to /login
				// Pages that require auth should check and redirect themselves
			}
		} else if (error.request) {
			// Request made but no response
			console.error("API Error: No response from server");
		} else {
			// Error setting up request
			console.error("API Error:", error.message);
		}
		return Promise.reject(error);
	},
);

export default apiClient;
