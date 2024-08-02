// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

// Initialize Firebase if it hasn't been initialized yet
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Firebase Authentication and get a reference to the service
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (error) {
  if (error.code === 'auth/already-initialized') {
    auth = getAuth(app);
  } else {
    throw error;
  }
}

// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

const storage = getStorage(app);

export {auth, db, storage };

