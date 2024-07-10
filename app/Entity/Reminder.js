import { db } from '../../firebase';
import { collection, doc, addDoc, getDocs, query, where, orderBy, limit, deleteDoc, updateDoc} from 'firebase/firestore';

class Reminder {
    constructor(id, day, time, type) {
        this.id = id
        this.day = day
        this.time = time
        this.type = type
    }

    static async createReminder(uid, reminderData) {
        try {
            const reminderRef = collection(db, 'users', uid, 'reminders');
            await addDoc(reminderRef, reminderData);
        } catch (error) {
            throw error;
        }
    }

    static async updateReminder(uid, reminderData) {
        try {
            const reminderRef = doc(db, 'users', uid, 'reminders', reminderData.id);
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
    }

    static async deleteReminder(uid, reminderId) {
        try {
            const reminderRef = doc(db, 'users', uid, 'reminders', reminderId);
            await deleteDoc(reminderRef);
        } catch (error) {
            console.error('Error deleting reminder:', error);
            throw error;
        }
    }

    static async fetchReminder(uid) {
        try {
            const remindersRef = collection(db, 'users', uid, 'reminders');
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
    }
}

export default Reminder