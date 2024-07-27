import { db } from '../../firebase'; 
import { collection, doc, addDoc, getDocs, query, where, orderBy, limit, deleteDoc, updateDoc} from 'firebase/firestore';

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

export const getMedicine = async (userId) => {
  try {
    const medicinesRef = collection(db, 'users', userId, 'medicinesSaved')
    const medicinesSnapshot = await getDocs(medicinesRef)
    const medicinesList = medicinesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    return medicinesList
  } catch (error) {
    
    throw error;
  }
}

export const getMedicineByName = async (userId, names) => {
  try {
    const medicines = [];
    const userRef = doc(db, 'users', userId); 
    const medicineRef = collection(userRef, 'medicinesSaved');
    const q = query(medicineRef, where('medicineName', 'in', names));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      medicines.push({ id: doc.id, ...doc.data() });
    });
    return medicines;
  } catch (error) {
    console.error('Error fetching medicines by names:', error);
    throw error;
  }
};

export const addMedicine = async (userId, medicine) => {
  try {
    const medicineLogsRef = collection(db, 'users', userId, 'medicinesSaved');
    await addDoc(medicineLogsRef, medicine);
  } catch (error) {
    console.error('Error adding medicine:', error);
    throw error;
  }
}

export const fetchLogs = async (userId, logType, limitCount = 10) => {
  try {
    const logsRef = collection(db, 'users', userId, logType);
    const logsQuery = query(logsRef, orderBy('time', 'desc'), limit(limitCount));
    const querySnapshot = await getDocs(logsQuery);
    const logs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return logs;
  } catch (error) {
    console.error(`Error fetching ${logType}:`, error);
    throw error;
  }
};

export const deleteLog = async (userId, logType, logId) => {
  try {
    const logRef = doc(db, 'users', userId, logType, logId);
    await deleteDoc(logRef);
  } catch (error) {
    console.error('Error deleting log:', error);
    throw error;
  }
};

export const updateGlucoseLog = async (userId, glucoseLog) => {
  try {
    const glucoseLogRef = doc(db, 'users', userId, 'glucoseLogs', glucoseLog.id);
    await updateDoc(glucoseLogRef, {
      timestamp: glucoseLog.timestamp,
      period: glucoseLog.period,
      glucoseValue: glucoseLog.glucoseValue,
    });
    console.log('Glucose log updated successfully:', glucoseLog);
  } catch (error) {
    console.error('Error updating glucose log:', error);
    throw error;
  }
};

export const updateMealLog = async (userId, mealLog) => {
  try {
    const mealLogRef = doc(db, 'users', userId, 'mealLogs', mealLog.id);
    await updateDoc(mealLogRef, {
      label: mealLog.label,
      category: mealLog.category,
      servings: mealLog.servings,
      calories: mealLog.calories,
      fat: mealLog.fat,
      protein: mealLog.protein,
      carbs: mealLog.carbs,
      notes: mealLog.notes,
      timestamp: mealLog.timestamp,
      period: mealLog.period,
    });
    console.log('Meal log updated successfully:', mealLog);
  } catch (error) {
    console.error('Error updating meal log:', error);
    throw error;
  }
};

export const updateMedicineLog = async (userId, medicineLog) => {
  try {
    const medicineLogRef = doc(db, 'users', userId, 'medicineLogs', medicineLog.id);
    await updateDoc(medicineLogRef, {
      timestamp: medicineLog.timestamp,
      medicine: medicineLog.medicine,
      notes: medicineLog.notes,
    });
    console.log('Medicine log updated successfully:', medicineLog);
  } catch (error) {
    console.error('Error updating medicine log:', error);
    throw error;
  }
};

export const calculateA1C = async (userId) => {
  // Set the date to three months ago
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  try {
    // Reference to the glucose logs collection for the user
    const glucoseLogsRef = collection(db, 'users', userId, 'glucoseLogs');

    // Query to get glucose logs from the past three months
    const q = query(glucoseLogsRef, where('time', '>=', threeMonthsAgo));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('No matching documents.');
      return 0; // Return 0 if there are no logs
    }

    let totalGlucose = 0;
    let count = 0;

    // Iterate over the query results
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const glucoseValue = parseFloat(data.glucose);
      if (!isNaN(glucoseValue)) {
        totalGlucose += glucoseValue;
        count++;
      }
    });

    // Calculate the average glucose level
    const averageGlucose = count > 0 ? totalGlucose / count : 0;

    // Convert average glucose level from mmol/L to mg/dL
    const averageBloodGlucoseMgDl = averageGlucose * 18;

    // Calculate the A1C value using the formula
    const a1c = (averageBloodGlucoseMgDl + 46.7) / 28.7;
    return a1c.toFixed(2);
  } catch (error) {
    return 0; // Return 0 in case of error
  }
};