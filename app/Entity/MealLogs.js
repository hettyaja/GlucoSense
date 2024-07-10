import { db } from '../../firebase';
import { collection, doc, addDoc, getDocs, query, where, orderBy, limit, deleteDoc, updateDoc} from 'firebase/firestore';

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
}

export default MealLogs