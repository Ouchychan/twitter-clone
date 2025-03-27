// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtXIph6-taO31TgofZ1f5hAsu7-dYmBTk",
  authDomain: "twitter-app-f46a4.firebaseapp.com",
  projectId: "twitter-app-f46a4",
  storageBucket: "twitter-app-f46a4.firebasestorage.app",
  messagingSenderId: "769850667455",
  appId: "1:769850667455:web:92300b0eeecac222b8710a",
  measurementId: "G-6KY4H17ND6"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);