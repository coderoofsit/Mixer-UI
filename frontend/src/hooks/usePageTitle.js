import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    // Map routes to page titles
    const getTitleForRoute = (pathname) => {
      // Remove trailing slash for consistency
      const path = pathname.replace(/\/$/, '');

      switch (path) {
        case '':
        case '/':
          return 'Mixer Dating App - Connecting Colorado Springs Singles';
        case '/dashboard':
          return 'Dashboard - Mixer Dating App';
        case '/profile':
          return 'Profile - Mixer Dating App';
        case '/matches':
          return 'Matches - Mixer Dating App';
        case '/upcoming-events':
        case '/events':
          return 'Upcoming Mixer Events - Mixer Dating App';
        case '/blind-mixers':
          return 'Blind Mixers - Mixer Dating App';
        case '/contact':
          return 'Contact - Mixer Dating App';
        case '/login':
          return 'Login - Welcome Back - Mixer Dating App';
        case '/signup':
          return 'Signup - Welcome - Mixer Dating App';
        case '/forgot-password':
          return 'Forgot Password - Mixer Dating App';
        case '/payment':
          return 'Payment - Mixer Dating App';
        case '/payment-success':
        case '/payment/success':
          return 'Payment Success - Mixer Dating App';
        case '/privacy':
        case '/privacy-policy':
          return 'Privacy Policy - Mixer Dating App';
        case '/terms':
        case '/terms-conditions':
          return 'Terms of Service - Mixer Dating App';
        case '/onboarding/profile-setup':
          return 'Profile Setup - Mixer Dating App';
        case '/onboarding/photos':
          return 'Add Photos - Mixer Dating App';
        case '/onboarding/interests':
          return 'Interests & Values - Mixer Dating App';
        case '/onboarding/complete':
          return 'Welcome to Mixer - Mixer Dating App';
        default:
          return 'Mixer Dating App';
      }
    };

    const title = getTitleForRoute(location.pathname);
    document.title = title;
  }, [location]);
};

export default usePageTitle;

