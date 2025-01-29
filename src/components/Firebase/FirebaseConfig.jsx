// Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Import Firestore methods

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpWI_HWbfKk6La4hG_ILEPXvgNj__NbyE",
  authDomain: "ksa4sale-classified.firebaseapp.com",
  projectId: "ksa4sale-classified",
  storageBucket: "ksa4sale-classified.firebasestorage.app",
  messagingSenderId: "909499598820",
  appId: "1:909499598820:web:2d2e057f79a6d1630969f1",
  measurementId: "G-J9L2V8EW22",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app); // Do this here and then export it below

// Export Firestore methods along with the app and analytics
export { app, analytics, db, doc, getDoc }; // No duplicate exports
