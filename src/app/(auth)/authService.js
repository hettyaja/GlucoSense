import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';


export const registerUser = async (email, password, additionalData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Store additional data in Firestore
      await setDoc(doc(db, 'users', user.uid), additionalData);
  
      return user;
    } catch (error) {
      throw error;
    }
  };


export const loginUser = async (email, password) => {
try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
    return { user, data: userDoc.data() };
    } else {
    throw new Error('User data not found');
    }
} catch (error) {
    throw error;
}
};