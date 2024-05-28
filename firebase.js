// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9mRAJlKbu1iIHvAx8rxBufvEygODJ_PY",
  authDomain: "glucosense-24-s2-07.firebaseapp.com",
  projectId: "glucosense-24-s2-07",
  storageBucket: "glucosense-24-s2-07.appspot.com",
  messagingSenderId: "714305903306",
  appId: "1:714305903306:web:6b002b3d51a2800dd8f233",
  measurementId: "G-85RBFPWP3T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);