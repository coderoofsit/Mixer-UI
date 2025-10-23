# Google Authentication Setup

## Prerequisites

1. A Google Cloud Console project
2. Google OAuth 2.0 credentials

## Setup Steps

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API

### 2. Configure OAuth Consent Screen

1. In Google Cloud Console, go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required information:
   - App name: "Mixer Dating App"
   - User support email: your email
   - Developer contact information: your email
4. Add your domain to authorized domains
5. Save and continue

### 3. Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)
5. Add authorized redirect URIs:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)
6. Copy the Client ID

### 4. Configure Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id-here
REACT_APP_API_URL=http://localhost:3001/api
```

### 5. Update the Authentication Service

Replace `'your-google-client-id'` in `src/services/authService.js` with your actual Google Client ID.

## Testing

1. Start the development server: `npm start`
2. Navigate to `/login` or `/signup`
3. Click "Sign in with Google" or "Sign up with Google"
4. Complete the Google OAuth flow

## Production Deployment

1. Update the authorized origins and redirect URIs in Google Cloud Console
2. Set the production environment variables
3. Ensure your domain is added to the OAuth consent screen

## Troubleshooting

- **"This app isn't verified"**: This is normal for development. Click "Advanced" > "Go to [App Name] (unsafe)" to proceed.
- **"Error 400: redirect_uri_mismatch"**: Check that your redirect URIs in Google Cloud Console match your application URLs.
- **"Error 403: access_denied"**: Ensure the Google+ API is enabled in your Google Cloud project.
