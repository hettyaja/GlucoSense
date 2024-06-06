// services/logService.js
import { db } from '../../../firebase'; // Adjust the path according to your project structure
import { collection, doc, addDoc, getDocs, query, where } from 'firebase/firestore';

// Add a new meal log
export const addMealLog = async (userId, mealLog) => {
  try {
    const mealLogsRef = collection(db, 'users', userId, 'mealLogs');
    await addDoc(mealLogsRef, mealLog);
  } catch (error) {
    console.error('Error adding meal log:', error);
    throw error;
  }
};

// Add a new glucose log
export const addGlucoseLog = async (userId, glucoseLog) => {
  try {
    const glucoseLogsRef = collection(db, 'users', userId, 'glucoseLogs');
    await addDoc(glucoseLogsRef, glucoseLog);
  } catch (error) {
    console.error('Error adding glucose log:', error);
    throw error;
  }
};

// Add a new medicine log
export const addMedicineLog = async (userId, medicineLog) => {
  try {
    const medicineLogsRef = collection(db, 'users', userId, 'medicineLogs');
    await addDoc(medicineLogsRef, medicineLog);
  } catch (error) {
    console.error('Error adding medicine log:', error);
    throw error;
  }
};

// Fetch meal logs for a user
export const getMealLogs = async (userId) => {
  try {
    const mealLogsRef = collection(db, 'users', userId, 'mealLogs');
    const q = query(mealLogsRef);
    const querySnapshot = await getDocs(q);
    const mealLogs = [];
    querySnapshot.forEach((doc) => {
      mealLogs.push({ id: doc.id, ...doc.data() });
    });
    return mealLogs;
  } catch (error) {
    console.error('Error fetching meal logs:', error);
    throw error;
  }
};

// Fetch glucose logs for a user
export const getGlucoseLogs = async (userId) => {
  try {
    const glucoseLogsRef = collection(db, 'users', userId, 'glucoseLogs');
    const q = query(glucoseLogsRef);
    const querySnapshot = await getDocs(q);
    const glucoseLogs = [];
    querySnapshot.forEach((doc) => {
      glucoseLogs.push({ id: doc.id, ...doc.data() });
    });
    return glucoseLogs;
  } catch (error) {
    console.error('Error fetching glucose logs:', error);
    throw error;
  }
};

// Fetch medicine logs for a user
export const getMedicineLogs = async (userId) => {
  try {
    const medicineLogsRef = collection(db, 'users', userId, 'medicineLogs');
    const q = query(medicineLogsRef);
    const querySnapshot = await getDocs(q);
    const medicineLogs = [];
    querySnapshot.forEach((doc) => {
      medicineLogs.push({ id: doc.id, ...doc.data() });
    });
    return medicineLogs;
  } catch (error) {
    console.error('Error fetching medicine logs:', error);
    throw error;
  }
};
