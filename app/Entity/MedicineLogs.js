import { db } from '../../firebase';
import { collection, doc, addDoc, getDocs, query, where, orderBy, limit, deleteDoc, updateDoc} from 'firebase/firestore';

class MedicineLogs {
    constructor(id, time, medicine) {
        this.id = id
        this.time = time
        this.medicine = medicine
    }

    static async createMedicineLogs(uid, medicineData) {
        try {
            const medicineLogsRef = collection(db, 'users', uid, 'medicineLogs');
            await addDoc(medicineLogsRef, medicineData);
          } catch (error) {
        throw error;
          }
    }

    static async updateMedicineLogs(uid, medicineData) {
        try {
          const medicineLogsRef = doc(db, 'users', uid, 'medicineLogs', medicineData.id);
          await updateDoc(medicineLogsRef, {
            time: medicineData.time,
            medicine: medicineData.medicine,
            notes: medicineData.notes,
            period: medicineData.period
          });
          console.log('Medicine log updated successfully:', medicineData);
        } catch (error) {
          console.error('Error updating glucose log:', error);
          throw error;
        }
    }

    static async deleteMedicineLogs(uid, medicineLogsId) {
        try {
          const logRef = doc(db, 'users', uid, 'medicineLogs', medicineLogsId);
          await deleteDoc(logRef);
        } catch (error) {
          console.error('Error deleting log:', error);
          throw error;
        }
    }

    static async fetchMedicineLogs(uid) {
        try {
          const logsRef = collection(db, 'users', uid, 'medicineLogs');
          const logsQuery = query(logsRef, orderBy('time', 'desc'), limit(10));
          const querySnapshot = await getDocs(logsQuery);
          const logs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          return logs;
        } catch (error) {
          console.error(`Error fetching medicine logs:`, error);
          throw error;
        }
      }
}

export default MedicineLogs