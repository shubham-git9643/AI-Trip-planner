// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARveAPu5ycjMD9QZMWJ19LLhohcgFjOd0",
  authDomain: "ai-travel-planner-49ddd.firebaseapp.com",
  projectId: "ai-travel-planner-49ddd",
  storageBucket: "ai-travel-planner-49ddd.firebasestorage.app",
  messagingSenderId: "332961233385",
  appId: "1:332961233385:web:0b084eda1a55c6a11f7378",
  measurementId: "G-9DJJHEE4K7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//const analytics = getAnalytics(app);