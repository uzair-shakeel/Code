// Firebase configuration file
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";

// Log environment variables to debug (remove this in production)
console.log(
  "Environment variables loaded:",
  !!process.env.REACT_APP_FIREBASE_API_KEY
);

// Fallback configuration (only used if environment variables aren't loaded)
const fallbackConfig = {
  apiKey: "AIzaSyCkmuikES9HqBe7KFSHfOJPTS60wX1LOHo",
  authDomain: "prequalification-form-e1360.firebaseapp.com",
  databaseURL:
    "https://prequalification-form-e1360-default-rtdb.firebaseio.com",
  projectId: "prequalification-form-e1360",
  storageBucket: "prequalification-form-e1360.firebasestorage.app",
  messagingSenderId: "485907865379",
  appId: "1:485907865379:web:03750d58a5e1bdcde6f696",
  measurementId: "G-MEE21T7T80",
};

// Your web app's Firebase configuration using environment variables with fallbacks
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || fallbackConfig.apiKey,
  authDomain:
    process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || fallbackConfig.authDomain,
  databaseURL:
    process.env.REACT_APP_FIREBASE_DATABASE_URL || fallbackConfig.databaseURL,
  projectId:
    process.env.REACT_APP_FIREBASE_PROJECT_ID || fallbackConfig.projectId,
  storageBucket:
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ||
    fallbackConfig.storageBucket,
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ||
    fallbackConfig.messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_APP_ID || fallbackConfig.appId,
  measurementId:
    process.env.REACT_APP_FIREBASE_MEASUREMENT_ID ||
    fallbackConfig.measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

console.log(
  "Firebase initialized with database URL:",
  firebaseConfig.databaseURL
);

export { database, ref, push, onValue };
