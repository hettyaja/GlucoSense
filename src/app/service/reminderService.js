import { db } from '../../../firebase'; // Adjust the path according to your project structure
import { collection, doc, addDoc, getDocs, query, where, orderBy, limit, deleteDoc, updateDoc } from 'firebase/firestore';

export const setReminder = async (userId, reminderData) => {
    try {
      const reminderRef = collection(db, 'users', userId, 'reminders');
      await addDoc(reminderRef, reminderData);
    } catch (error) {
      console.error('Error adding reminder:', error);
      throw error;
    }
  };

export const fetchReminders = async (userId) => {
    try {
        const remindersRef = collection(db, 'users', userId, 'reminders');
        const q = query(remindersRef);
        const querySnapshot = await getDocs(q);
        const reminders = [];
        querySnapshot.forEach((doc) => {
        reminders.push({ id: doc.id, ...doc.data() });
        });
        return reminders;
    } catch (error) {
        console.error('Error fetching reminders:', error);
        throw error;
    }
};

export const updateReminder = async (userId, reminderData) => {
    try {
      const reminderRef = doc(db, 'users', userId, 'reminders', reminderData.id);
      await updateDoc(reminderRef, {
        time: reminderData.time,
        day: reminderData.day,
        type: reminderData.type,
      });
      console.log('Reminder updated successfully:', reminderData);
    } catch (error) {
      console.error('Error updating reminder:', error);
      throw error;
    }
  };

export const deleteReminder = async (userId, reminderData) => {
try {
    const reminderRef = doc(db, 'users', userId, 'reminders', reminderData.id);
    await deleteDoc(reminderRef);
} catch (error) {
    console.error('Error deleting reminder:', error);
    throw error;
}
};