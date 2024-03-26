// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-9b0c4.firebaseapp.com",
  projectId: "mern-estate-9b0c4",
  storageBucket: "mern-estate-9b0c4.appspot.com",
  messagingSenderId: "630315370389",
  appId: "1:630315370389:web:ac0e17b0c2955430ec189c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);