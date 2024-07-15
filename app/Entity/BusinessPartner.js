import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, deleteDoc, getDocs, Timestamp, collection } from 'firebase/firestore';
import { deleteUser as firebaseDeleteUser } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      await AsyncStorage.clear();
      const currentUser = auth.currentUser;
      if (currentUser) {
          await firebaseDeleteUser(currentUser);
      } else {
          throw new Error('No user is currently signed in');
      }
      return true;
    } catch (error) {
        console.error('Error deleting user profile:', error);
        throw error;
    }
  }

  static async export() {
    try {
      const partnersCollection = await getDocs(collection(db, 'businessPartner'));
      return partnersCollection.docs.map(doc => doc.data());
    } catch (error) {
      throw new Error('Failed to fetch business partners.');
    }
  }

  static async suspendBusinessPartner() {
    // Firebase logic
  }

  static async unsuspendBusinessPartner() {
    // Firebase logic
  }

  static async approveBusinessPartner() {
    // Firebase logic
  }

  static async rejectBusinessPartner() {
    // Firebase logic
  }
}

export default BusinessPartner;
