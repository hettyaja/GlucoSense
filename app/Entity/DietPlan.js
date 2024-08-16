import {doc, deleteDoc, updateDoc, collection, addDoc, getDoc, getDocs, query} from 'firebase/firestore';
import {db} from '../../firebase';

class DietPlan {
  static async fetchAllDietPlansForUser() {
    try {
      const dietPlanCollection = [];
      const businessPartnersSnapshot = await getDocs(collection(db, 'businessPartner'));
  
      for (const businessPartnerDoc of businessPartnersSnapshot.docs) {
        const dietPlanRef = collection(db, 'businessPartner', businessPartnerDoc.id, 'dietplan');
        const dietPlanSnapshot = await getDocs(dietPlanRef);
  
        dietPlanSnapshot.forEach((dietPlanDoc) => {
          const dietPlanData = dietPlanDoc.data();
          dietPlanCollection.push({
            dietPlanId: dietPlanDoc.id,
            bpId: businessPartnerDoc.id,
            entityName: businessPartnerDoc.data().entityName,
            ...dietPlanData
          });
        });
      }
  
      return dietPlanCollection;
    } catch (error) {
      console.error('Error fetching diet plan data:', error);
      throw error;
    }
  }
}

export default DietPlan