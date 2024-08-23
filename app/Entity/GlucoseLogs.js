import { db } from '../../firebase';
import { collection, doc, addDoc, getDocs, query, where, orderBy, limit, deleteDoc, updateDoc, Timestamp} from 'firebase/firestore';


class GlucoseLogs {
    constructor(id, time, period, glucose) {
        this.id = id
        this.time = time
        this.period = period
        this.glucose = glucose
    }

    static async createGlucoseLogs(uid, glucoseData, isFromBluetooth = false) {
      try {
        const glucoseLogsRef = collection(db, 'users', uid, 'glucoseLogs');
        
        if (isFromBluetooth) {
          // Perform a duplicate check
          const q = query(glucoseLogsRef, where('glucose', '==', glucoseData.glucose), where('time', '==', glucoseData.time));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            console.log('Duplicate entry found, skipping insertion.');
            return false; // Exit the function if a duplicate is found
          }
        }
  
        // If no duplicates are found, or if it's not from Bluetooth, add the log
        await addDoc(glucoseLogsRef, glucoseData);
        console.log('Glucose log added successfully.');
        return true
      } catch (error) {
        console.error('Error adding glucose log:', error);
        throw error;
      }
    }

    static async updateGlucoseLogs(uid, glucoseData) {
        try {
          const glucoseLogsRef = doc(db, 'users', uid, 'glucoseLogs', glucoseData.id);
          await updateDoc(glucoseLogsRef, {
            time: glucoseData.time,
            period: glucoseData.period,
            glucose: glucoseData.glucose,
            notes: glucoseData.notes
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
          const logsQuery = query(logsRef, orderBy('time', 'desc'));
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
    
            // Get the current timestamp in Singapore time
            const now = new Date();
            const singaporeTime = new Date(now.getTime() + (8 * 60 * 60 * 1000)); // Adding 8 hours for SGT
    
            // Calculate the timestamp for 7 days ago in Singapore time
            const sevenDaysAgo = new Date(singaporeTime.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    
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
                const date = new Date(singaporeTime.getTime() - i * 24 * 60 * 60 * 1000);
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
    static async fetchGlucoseLogsForDataInsight(uid, period) {
      try {
        const logsRef = collection(db, 'users', uid, 'glucoseLogs');
        const now = new Date();
        const singaporeTime = new Date(now.getTime() + (8 * 60 * 60 * 1000)); // Adding 8 hours for SGT
        let timePeriod;
    
        if (period === 'daily') {
          timePeriod = new Date(singaporeTime.getTime() - 1 * 24 * 60 * 60 * 1000); // 1 day ago
        } else if (period === 'weekly') {
          timePeriod = new Date(singaporeTime.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
        } else if (period === 'monthly') {
          timePeriod = new Date(singaporeTime.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
        } else {
          throw new Error('Invalid period specified');
        }
    
        const timestamp = Timestamp.fromDate(timePeriod);
    
        const logsQuery = query(
          logsRef,
          where('time', '>=', timestamp),
          orderBy('time', 'desc')
        );
    
        const querySnapshot = await getDocs(logsQuery);
        const logs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
        return logs;
      } catch (error) {
        console.error(`Error fetching glucose logs for ${period}:`, error);
        throw error;
      }
    }

    static async calculateA1C(userId)  {
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
    
        // Check if there are less than 21 logs
        if (count < 21) {
          return 0; // Return 0 if there are less than 21 logs
        }
    
        // Calculate the average glucose level
        const averageGlucose = totalGlucose / count;
    
        // Convert average glucose level from mmol/L to mg/dL
        const averageBloodGlucoseMgDl = averageGlucose * 18;
    
        // Calculate the A1C value using the formula
        const a1c = (averageBloodGlucoseMgDl + 46.7) / 28.7;
        return a1c.toFixed(2);
      } catch (error) {
        return 0; // Return 0 in case of error
      }
    }
    
    
    
    
    

}



export default GlucoseLogs