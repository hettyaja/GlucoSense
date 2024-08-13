import { auth, db} from '../../firebase'; // Adjust the path according to your project structure
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { doc, setDoc, deleteDoc, getDocs, Timestamp, collection, updateDoc, getDoc, addDoc, query, where } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebaseDeleteUser } from 'firebase/auth';
import axios from 'axios';

const CLOUD_FUNCTION_URL = 'https://us-central1-glucosense-24-s2-07.cloudfunctions.net/expressApi';

class BusinessPartner {
  constructor(id, entityName, UEN, city, address, postal, name, phoneNum, email, registerTime, status, userType) {
    this.id = id;
    this.entityName = entityName;
    this.UEN = UEN;
    this.city = city;
    this.address = address;
    this.postal = postal;
    this.name = name;
    this.phoneNum = phoneNum;
    this.email = email;
    this.registerTime = registerTime;
    this.status = status;
    this.userType = userType;
  }

  static async register(email, password, additionalData) {
    try {
      console.log('Registering business partner with email:', email);
      const businessPartnerCredential = await createUserWithEmailAndPassword(auth, email, password);
      const businessPartner = businessPartnerCredential.user;
      const businessPartnerRef = doc(db, 'businessPartner', businessPartner.uid);
      const registerTime = Timestamp.fromDate(new Date());
      await setDoc(businessPartnerRef, {
        entityName: additionalData.entityName,
        UEN: additionalData.UEN,
        city: additionalData.city,
        address: additionalData.address,
        postal: additionalData.postal,
        name: additionalData.name,
        phoneNum: additionalData.phoneNum,
        email,
        registerTime: registerTime,
        status: 'pending',
        userType: 'businessPartner',
      });
      return new BusinessPartner(businessPartner.uid, additionalData.entityName, additionalData.UEN, additionalData.city, additionalData.address, additionalData.postal, additionalData.name, additionalData.phoneNum, email, registerTime, 'pending', 'businessPartner');
    } catch (error) {
      console.error('Error registering business partner:', error.message); 
      throw new Error(error.message);
    }
  }


  static async deleteBP(uid) {
    try {
      const businessPartnerDocRef = doc(db, 'businessPartner', uid);
      await deleteDoc(businessPartnerDocRef);
      await axios.delete(`${CLOUD_FUNCTION_URL}/deleteUser/${uid}`);
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error rejecting business partner:', error);
      throw error;
    }
  }

  static async updateProfileBp(uid, profileData){
    try{
      const profileRef = doc(db,'businessPartner', uid);
      await updateDoc(profileRef, profileData)
      console.log("Profile updated successfully");
    }catch(error){
        console.error("Error updating profile", error);
    }
  }

  static async fetchBPProfile(uid){
       try{
          const docRef = doc(db, 'businessPartner', uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            return docSnap.data();
          } else {
            console.log('No such document!');
            return null;
          }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        throw error;
      }
  }

  static async export() {
    try {
      const partnersCollection = await getDocs(collection(db, 'businessPartner'));
      return partnersCollection.docs.map(doc => ({ ...doc.data(), id: doc.id })).filter(account => account.status !== 'pending')
    } catch (error) {
      throw new Error('Failed to fetch business partners.');
    }
  }

  static async suspendBusinessPartner(uid) {
    try {
      const businessPartnerDocRef = doc(db, 'businessPartner', uid);
      await updateDoc(businessPartnerDocRef, { status: 'suspended' });
      return true;
    } catch (error) {
      console.error('Error suspending business partner:', error);
      throw error;
    }
  }

  static async unsuspendBusinessPartner(uid) {
    try {
      const businessPartnerDocRef = doc(db, 'businessPartner', uid);
      await updateDoc(businessPartnerDocRef, { status: 'active' });
      return true;
    } catch (error) {
      console.error('Error unsuspending business partner:', error);
      throw error;
    }
  }

  static async approveBusinessPartner(uid) {
    try {
      const businessPartnerDocRef = doc(db, 'businessPartner', uid);
      await updateDoc(businessPartnerDocRef, { status: 'active' });
      return true;
    } catch (error) {
      console.error('Error approving business partner:', error);
      throw error;
    }
  }

  static async rejectBusinessPartner(uid) {
    try {
      const businessPartnerDocRef = doc(db, 'businessPartner', uid);
      await deleteDoc(businessPartnerDocRef);
      await axios.delete(`${CLOUD_FUNCTION_URL}/deleteUser/${uid}`);
      return true;
    } catch (error) {
      console.error('Error rejecting business partner:', error);
      throw error;
    }
  }

  static async getPendingAccounts() {
    try {
      const accountsCollection = await getDocs(collection(db, 'businessPartner'));
      return accountsCollection.docs
        .map(doc => ({ ...doc.data(), id: doc.id }))
        .filter(account => account.status === 'pending');
    } catch (error) {
      console.error('Error fetching pending accounts:', error);
      throw new Error('Failed to fetch pending accounts.');
    }
  }

  static async getPendingDetails(uid) {
    try {
      const businessPartnerDocRef = doc(db, 'businessPartner', uid);
      const docSnap = await getDoc(businessPartnerDocRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }; // Ensure to include id
      } else {
        throw new Error('No such document!');
      }
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw new Error('Failed to fetch account details.');
    }
  }

 

  static async createDietPlan(userId, newDietPlan) {
    const dietPlanCollection = collection(db, `businessPartner/${userId}/dietplan`);
    const docRef = await addDoc(dietPlanCollection, newDietPlan);
    return docRef.id;
  }

  static async fetchDietPlans(userId) {
    const dietPlanCollection = collection(db, `businessPartner/${userId}/dietplan`);
    const dietPlanSnapshot = await getDocs(dietPlanCollection);
    return dietPlanSnapshot.docs.map(doc => ({
      ...doc.data(), id: doc.id,
    }));
  }

  static async updateDietPlan(userId, updatedDietPlan) {
    const { id, ...dietPlanWithoutId } = updatedDietPlan; // Destructure to exclude `id`
    const dietPlanDoc = doc(db, `businessPartner/${userId}/dietplan`, id);
    await updateDoc(dietPlanDoc, dietPlanWithoutId);
  }

  static async deleteDietPlan(userId, dietPlanId) {
    const dietPlanDoc = doc(db, `businessPartner/${userId}/dietplan`, dietPlanId);
    await deleteDoc(dietPlanDoc);
  }

  static async fetchTotalPartnership() {
    try {
      const totalPartnerships = await getDocs(collection(db, 'businessPartner'))
      return totalPartnerships.size
    } catch (error) {
      throw error
    }
  }

  static async fetchActivePartnership() {
    try {
      const q = query(collection(db, 'businessPartner'), where('status', '==', 'active'))
      const activePartnerships = await getDocs(q)
      return activePartnerships.size
    } catch (error) {
      throw error
    }
  }

  static async fetchPendingPartnership() {
    try {
      const q = query(collection(db, 'businessPartner'), where('status', '==', 'pending'))
      const pendingPartnerships = await getDocs(q)
      return pendingPartnerships.size
    } catch (error) {
      throw error
    }
  }

  // static async fetchDietPlans(userId) {
  //   const dietPlanCollection = collection(db, `businessPartner/${userId}/dietplan`);
  //   const dietPlanSnapshot = await getDocs(dietPlanCollection);
  //   return dietPlanSnapshot.docs.map(doc => ({
  //     ...doc.data(), id: doc.id,
  //   }));
  // }

  static async fetchAllDietPlans() {
    try {
      const businessPartnerCollection = collection(db, 'businessPartner');
      const businessPartnerSnapshot = await getDocs(businessPartnerCollection);
      
      const dietPlans = [];
      
      for (const businessPartnerDoc of businessPartnerSnapshot.docs) {
        const dietPlanCollection = collection(db, `businessPartner/${businessPartnerDoc.id}/dietplan`);
        const dietPlanSnapshot = await getDocs(dietPlanCollection);
        
        dietPlanSnapshot.docs.forEach(dietPlanDoc => {
          dietPlans.push({
            ...dietPlanDoc.data(),
            id: dietPlanDoc.id,
            businessPartnerId: businessPartnerDoc.id,
          });
        });
      }
  
      return dietPlans;
    } catch (error) {
      console.error("Error fetching diet plans:", error);
      throw error;
    }
  }
}

export default BusinessPartner;
