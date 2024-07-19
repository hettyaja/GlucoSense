import { db } from '../../firebase';
import { collection, doc, addDoc, getDocs, query, where, orderBy, limit, deleteDoc, updateDoc, Timestamp} from 'firebase/firestore';


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
    
      static async fetchGlucoseLogsForInsight(uid) {
        try {
            const logsRef = collection(db, 'users', uid, 'glucoseLogs');
    
            // Get the timestamp for 7 days ago
            const now = new Date();
            const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    
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
    
            // Initialize labels and data for the last 7 days
            const labels = [];
            const data = [];
            const dayData = {};
            for (let i = 6; i >= 0; i--) {
                const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
                const day = date.toLocaleDateString('en-US', { weekday: 'short' });
                const key = date.toDateString();
                labels.push(day);
                dayData[key] = { total: 0, count: 0, day };
            }
    
            // Populate dayData with logs
            logs.forEach(log => {
                const logDate = log.time.toDate();
                const key = logDate.toDateString();
                if (dayData[key]) {
                    dayData[key].total += parseFloat(log.glucose);
                    dayData[key].count += 1;
                }
            });
    
            // Fill the data array with average glucose values
            labels.forEach(label => {
                const day = Object.values(dayData).find(d => d.day === label);
                if (day.count > 0) {
                    data.push(day.total / day.count);
                } else {
                    data.push(0); // Or use 0 or another value to represent no data
                }
            });
    
            console.log('Processed graph data:', { labels, datasets: [{ data }] });
    
            return { labels, datasets: [{ data }] };
        } catch (error) {
            console.error(`Error fetching glucose logs for graph:`, error);
            throw error;
        }
    }
    
    
    
    

}

export default GlucoseLogs