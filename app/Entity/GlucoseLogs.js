import { db } from '../../firebase';
import { doc, setDoc, deleteDoc, addDoc, collection, updateDoc} from 'firebase/firestore';


class GlucoseLogs {
    constructor(id, time, period, glucose) {
        this.id = id
        this.time = time
        this.period = period
        this.glucose = glucose
    }

    static async createGlucoseLogs(uid, glucoseData) {
        try {
            const glucoseLogsRef = collection(db, 'users', uid, 'glucoseLogs');
            await addDoc(glucoseLogsRef, glucoseData);
          } catch (error) {
            throw error;
          }
    }

    static async updateGlucoseLogs(uid, glucoseData) {
        try {
          const glucoseLogsRef = doc(db, 'users', uid, 'glucoseLogs', glucoseData.id);
          await updateDoc(glucoseLogsRef, {
            time: glucoseData.time,
            period: glucoseData.period,
            glucose: glucoseData.glucose
          });
          console.log('Glucose log updated successfully:', glucoseData);
        } catch (error) {
          console.error('Error updating glucose log:', error);
          throw error;
        }
    }

    static async deleteGlucoseLogs(uid, glucoseLogsId) {
        try {
          const logRef = doc(db, 'users', uid, 'glucoseLogs', glucoseLogsId);
          await deleteDoc(logRef);
        } catch (error) {
          console.error('Error deleting log:', error);
          throw error;
        }
      }

}

export default GlucoseLogs