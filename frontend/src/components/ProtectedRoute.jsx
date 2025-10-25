// Component to protect routes that require authentication
// Redirects unauthenticated users to login page
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoute = ({ children }) => {
  // Check if user is authenticated
  const isAuthenticated = authService.isAuthenticated();
  
  // If user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If authenticated, render the requested page
  return children;
};

export default ProtectedRoute;

