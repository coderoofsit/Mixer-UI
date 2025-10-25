// Component to protect routes that should only be accessible to non-authenticated users
// Redirects authenticated users to home page
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const GuestRoute = ({ children }) => {
  // Check if user is authenticated
  const isAuthenticated = authService.isAuthenticated();
  
  // If user is authenticated, redirect to home page
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  // If not authenticated, render the requested page
  return children;
};

export default GuestRoute;

