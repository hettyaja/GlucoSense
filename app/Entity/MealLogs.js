import { db } from '../../firebase';
import { collection, doc, addDoc, getDocs, query, where, orderBy, limit, deleteDoc, updateDoc, Timestamp} from 'firebase/firestore';

class MealLogs {
    constructor(id, time, period, mealName, servings, calories, carbs, fat, protein, notes) {
        this.id = id;
        this.time = time;
        this.period = period
        this.mealName = mealName
        this.servings = servings
        this.calories = calories
        this.carbs = carbs
        this.fat = fat
        this.protein = protein
        this.notes = notes
    }

    static async createMealLogs(uid, mealData) {
        try {
            const mealLogsRef = collection(db, 'users', uid, 'mealLogs');
            await addDoc(mealLogsRef, mealData);
          } catch (error) {
            throw error;
          }
    }

    static async updateMealLogs(uid, mealData) {
      try {
        const mealLogRef = doc(db, 'users', uid, 'mealLogs', mealData.id);
        await updateDoc(mealLogRef, {
          mealName: mealData.mealName,
          servings: mealData.servings,
          calories: mealData.calories,
          fat: mealData.fat,
          protein: mealData.protein,
          carbs: mealData.carbs,
          notes: mealData.notes,
          time: mealData.time,
          period: mealData.period,
        });
        console.log('Meal log updated successfully:', mealData);
      } catch (error) {
        console.error('Error updating meal log:', error);
        throw error;
      }
    }

    static async deleteMealLogs(uid, mealLogId) {
      try {
        const logRef = doc(db, 'users', uid, 'mealLogs', mealLogId);
        await deleteDoc(logRef);
      } catch (error) {
        console.error('Error deleting log:', error);
        throw error;
      }
    }

    static async fetchMealLogs(uid) {
      try {
        const logsRef = collection(db, 'users', uid, 'mealLogs');
        const logsQuery = query(logsRef, orderBy('time', 'desc'), limit(10));
        const querySnapshot = await getDocs(logsQuery);
        const logs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return logs;
      } catch (error) {
        console.error(`Error fetching meal logs:`, error);
        throw error;
      }
    }

    static async fetchMealLogsForInsight(uid) {
      try {
          const logsRef = collection(db, 'users', uid, 'mealLogs');
  
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
                  dayData[key].total += parseFloat(log.calories);
                  dayData[key].count += 1;
              }
          });
  
          // Fill the data array with total calorie values
          labels.forEach(label => {
              const day = Object.values(dayData).find(d => d.day === label);
              if (day.count > 0) {
                  data.push(day.total);
              } else {
                  data.push(0); // Or use 0 or another value to represent no data
              }
          });
  
          console.log('Processed graph data:', { labels, datasets: [{ data }] });
  
          return { labels, datasets: [{ data }] };
      } catch (error) {
          console.error(`Error fetching meal logs for graph:`, error);
          throw error;
      }
  }
  

  static async fetchMealLogsForDataInsight(uid, period) {
    try {
      const logsRef = collection(db, 'users', uid, 'mealLogs');
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
      console.error(`Error fetching meal logs for ${period}:`, error);
      throw error;
    }
  }
}

export default MealLogs