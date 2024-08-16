import { db } from '../../firebase';
import { collection, doc, addDoc, getDocs, query, where, orderBy, limit, deleteDoc, updateDoc} from 'firebase/firestore';

class MedicineLogs {
    constructor(id, time, medicine) {
        this.id = id
        this.time = time
        this.medicine = medicine
    }

    static async createMedList(uid, medSaved){
      try{
        const medListRef = collection(db, 'users', uid, 'medicinesSaved');
        await addDoc(medListRef, medSaved);
      }catch(error){
        console.error('Error adding medicine:', error);
        throw error
      }
    }

    static async getMedicine (uid){
      try {
        const medicinesRef = collection(db, 'users', uid, 'medicinesSaved')
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

    static async updateMedicineList(uid, medicineData) {
      try {
        const medicineListRef = doc(db, 'users', uid, 'medicinesSaved', medicineData.id);
        await updateDoc(medicineListRef, {
          medicineName : medicineData.medicineName,
          type: medicineData.type,
          unit: medicineData.unit,
          InsulinType: medicineData.InsulinType
        });
        console.log('Medicine details updated successfully:', medicineData);
      } catch (error) {
        console.error('Error updating medicine details', error);
        throw error;
      }
  }

  static async deleteMedList(uid, medicine) {
    try {
      const medListDocRef = doc(db, 'users', uid, 'medicinesSaved', medicine.id);
      await deleteDoc(medListDocRef);
    } catch(error) {
      throw error
    }
  }

  static async deleteAddress (userId, address) {
    try {
      const addressDocRef = doc(db, 'users', userId, 'addressDetails', address.id);
      await deleteDoc(addressDocRef);
    } catch (error) {
      console.error('Error deleting address:', error);
      throw error;
    }
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
          console.error('Error updating med log:', error);
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

    static async getMedicineByName(userId, name) {
      try {
        const medicines = [];
        const userRef = doc(db, 'users', userId); 
        const medicineRef = collection(userRef, 'medicinesSaved');
        const q = query(medicineRef, where('medicineName', 'in', name));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          medicines.push({ id: doc.id, ...doc.data() });
        });
        return medicines;
      } catch (error) {
        console.error('Error fetching medicines by names:', error);
        throw error;
      }
    }
}

export default MedicineLogs