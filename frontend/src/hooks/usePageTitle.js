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
          return 'Home';
        case '/dashboard':
          return 'Dashboard on Mixer';
        case '/profile':
          return 'Profile on Mixer';
        case '/matches':
          return 'Matches on Mixer';
        case '/upcoming-events':
        case '/events':
          return 'Upcoming Events on Mixer';
        case '/blind-mixers':
          return 'Blind Date on Mixer';
        case '/contact':
          return 'Contact';
        case '/login':
          return 'Login on Mixer';
        case '/signup':
          return 'Sign Up on Mixer';
        case '/forgot-password':
          return 'Forgot Password on Mixer';
        case '/payment':
          return 'Payment on Mixer';
        case '/payment-success':
        case '/payment/success':
          return 'Payment Success on Mixer';
        case '/privacy':
        case '/privacy-policy':
          return 'Privacy Policy on Mixer';
        case '/terms':
        case '/terms-conditions':
          return 'Terms of Service on Mixer';
        case '/onboarding/profile-setup':
          return 'Profile Setup on Mixer';
        case '/onboarding/photos':
          return 'Add Photos on Mixer';
        case '/onboarding/interests':
          return 'Interests & Values on Mixer';
        case '/onboarding/complete':
          return 'Welcome to Mixer';
        default:
          return 'Mixer';
      }
    };

    const title = getTitleForRoute(location.pathname);
    document.title = title;
  }, [location]);
};

export default usePageTitle;

