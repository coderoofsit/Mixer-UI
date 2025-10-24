// Firebase Configuration
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  OAuthProvider,
  signInWithPopup,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';

// Your web app's Firebase configuration
// Get these values from Firebase Console: https://console.firebase.google.com/
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDZJaefP442dlzcMTdyrDaDQPGRdbvt-hg",
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
//   appId: process.env.REACT_APP_FIREBASE_APP_ID || "YOUR_APP_ID",
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "YOUR_MEASUREMENT_ID"
// };

const firebaseConfig = {
    apiKey: "AIzaSyDZJaefP442dlzcMTdyrDaDQPGRdbvt-hg",
    authDomain: "eventdating-3f1cb.firebaseapp.com",
    projectId: "eventdating-3f1cb",
    storageBucket: "eventdating-3f1cb.firebasestorage.app",
    messagingSenderId: "310888682911",
    appId: "1:310888682911:web:34293592f3fa800c3099aa",
    measurementId: "G-91DLF8MP4D"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Configure Google Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Configure Apple Provider
const appleProvider = new OAuthProvider('apple.com');
appleProvider.addScope('email');
appleProvider.addScope('name');

export {
  auth,
  googleProvider,
  appleProvider,
  signInWithPopup,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail
};

export default app;

