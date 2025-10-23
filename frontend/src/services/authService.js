// Google Authentication Service
// This service handles Google OAuth integration

class AuthService {
  constructor() {
    this.isGoogleLoaded = false;
    this.initGoogleAuth();
  }

  // Initialize Google Auth
  initGoogleAuth() {
    // Load Google Identity Services script
    if (!window.google) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        this.isGoogleLoaded = true;
        this.initializeGoogleAuth();
      };
      document.head.appendChild(script);
    } else {
      this.isGoogleLoaded = true;
      this.initializeGoogleAuth();
    }
  }

  // Initialize Google Auth with configuration
  initializeGoogleAuth() {
    if (window.google && window.google.accounts) {
      // Configure Google Identity Services
      window.google.accounts.id.initialize({
        client_id:
          process.env.REACT_APP_GOOGLE_CLIENT_ID || "your-google-client-id",
        callback: this.handleGoogleResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
      });
    }
  }

  // Handle Google authentication response
  handleGoogleResponse(response) {
    try {
      // Decode the JWT token
      const payload = JSON.parse(atob(response.credential.split(".")[1]));

      // Extract user information
      const userInfo = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        given_name: payload.given_name,
        family_name: payload.family_name,
      };

      // Store user info in localStorage
      localStorage.setItem("user", JSON.stringify(userInfo));
      localStorage.setItem("authToken", response.credential);

      // Return user info for further processing
      return userInfo;
    } catch (error) {
      console.error("Error processing Google response:", error);
      throw new Error("Failed to process Google authentication");
    }
  }

  // Trigger Google Sign In
  async signInWithGoogle() {
    if (!this.isGoogleLoaded) {
      throw new Error("Google authentication not loaded");
    }

    return new Promise((resolve, reject) => {
      try {
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            reject(new Error("Google sign-in was cancelled or not displayed"));
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // Sign out user
  signOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");

    if (window.google && window.google.accounts) {
      window.google.accounts.id.disableAutoSelect();
    }
  }

  // Get current user
  getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem("authToken");
  }

  // Regular email/password authentication
  async signInWithEmail(email, password) {
    try {
      // TODO: Implement actual API call to your backend
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();

      // Store auth token
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return data.user;
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  }

  // Register with email/password
  async signUpWithEmail(userData) {
    try {
      // TODO: Implement actual API call to your backend
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();

      // Store auth token
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return data.user;
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;
