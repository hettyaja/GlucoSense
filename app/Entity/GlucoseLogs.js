import { db } from '../../firebase';
import { collection, doc, addDoc, getDocs, query, where, orderBy, limit, deleteDoc, updateDoc} from 'firebase/firestore';


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

    static async fetchGlucoseLogs(uid) {
        try {
          const logsRef = collection(db, 'users', uid, 'glucoseLogs');
          const logsQuery = query(logsRef, orderBy('time', 'desc'), limit(10));
          const querySnapshot = await getDocs(logsQuery);
          const logs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          return logs;
        } catch (error) {
          console.error(`Error fetching glucose logs:`, error);
          throw error;
        }
      }
    
      static async fetchGlucoseLogsForGraph(uid) {
        try {
            const logsRef = collection(db, 'users', uid, 'glucoseLogs');
    
            // Get the timestamp for 7 days ago
            const now = new Date();
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(now.getDate() - 7);
    
            // Convert the date to a Firestore timestamp
            const timestamp = Timestamp.fromDate(sevenDaysAgo);
    
            // Adjust the query to fetch logs from the last 7 days
            const logsQuery = query(
                logsRef,
                where('time', '>=', timestamp),
                orderBy('time', 'desc')
            );
    
            const querySnapshot = await getDocs(logsQuery);
            const logs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
            // Debugging: Print fetched logs
            logs.forEach(log => {
                console.log('Fetched log time:', log.time.toDate().toISOString());
            });
    
            logs.sort((a, b) => a.time.seconds - b.time.seconds); // Sort data by time in ascending order
    
            const labels = logs.map(item => {
                const time = new Date(item.time.seconds * 1000);
                const hours = time.getHours().toString().padStart(2, '0');
                const minutes = time.getMinutes().toString().padStart(2, '0');
                return `${hours}:${minutes}`;
            });
    
            const data = logs.map(item => parseFloat(item.glucose));
    
            console.log('Processed graph data:', { labels, datasets: [{ data }] });
    
            return { labels, datasets: [{ data }] };
        } catch (error) {
            console.error(`Error fetching glucose logs for graph:`, error);
            throw error;
        }
    }
    

}

export default GlucoseLogs