import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc, deleteDoc, getDocs, updateDoc, Timestamp, collection, getDoc, query, where, addDoc, writeBatch} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const CLOUD_FUNCTION_URL = 'https://us-central1-glucosense-24-s2-07.cloudfunctions.net/expressApi';

class User {
  constructor(id, username, name, email, userType, registerTime, status, weight, gender, height, birthdate, bodyProfileComplete) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.email = email;
    this.userType = userType;
    this.registerTime = registerTime;
    this.status = status;
    this.weight = weight;
    this.gender = gender;
    this.height = height;
    this.birthdate = birthdate;
    this.bodyProfileComplete = bodyProfileComplete;
  }

  static async fetchProfile(uid) { 
    try { 
      const userDoc = await getDoc(doc(db, 'users', uid)); 
      if (userDoc.exists()) {
        return { ...userDoc.data(), id: userDoc.id };
      } else {
        throw new Error('No such document!');
      }
    } catch (error) { 
      throw new Error('Failed to fetch user profile: ' + error.message); 
    } 
  }

  static async register(email, password, additionalData) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userRef = doc(db, 'users', user.uid);
      const registerTime = Timestamp.fromDate(new Date());
      await setDoc(userRef, {
        email,
        username: additionalData.username,
        name: additionalData.name,
        subscriptionType: 'free',
        registerTime: registerTime,
        status: 'active',
        bodyProfileComplete: false,
        goals: {
          BMRGoals: {
            weightGoals: 'Maintain',
            activityLevel: 'Light',
            calorieGoals: null,
            default: true
          },
          customGoals: {
            calorieGoals: null,
            default: false
          },
          glucoseGoals: {
            beforeMealLowerBound: 80,
            beforeMealUpperBound: 130,
            afterMealLowerBound: 80,
            afterMealUpperBound: 180,
          }
        }
      });
      return new User(user.uid, additionalData.username, additionalData.name, email, 'free', registerTime, 'active', false);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('This email is already in use. Please use a different email.');
      } else if (error.code === 'auth/weak-password') {
          throw new Error('Password should be at least 6 characters.');
      } else if (error.code === 'auth/missing-password') {
          throw new Error('The password field cannot be empty.');2
      } else if (error.code === 'auth/invalid-email') {
          throw new Error('Please input valid email.');
      } else {
          throw new Error(error.message);
      }
    }
  }

  static async login(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        throw new Error('The password is incorrect. Please try again.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Please enter a valid email address.');
      } else if (error.code === 'auth/user-not-found') {
        throw new Error('No user found with this email address.');
      } else if (error.code === 'auth/invalid-credential') {
        throw new Error('Please enter valid credentials')
      } else {
        throw new Error(error.message);
      }
    }
  }

  static async logout() {
    try {
      await signOut(auth);
      await AsyncStorage.clear();
    } catch (error) {
      throw new Error('No user is currently signed in');
    }
  }


  static async deleteUser(uid) {
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

  static async createBodyProfile(uid, bodyProfileData) {
    try {
        const bodyProfileRef = doc(db, 'users', uid);

        // Retrieve current goals from the user's document
        const userDoc = await getDoc(bodyProfileRef);
        const userData = userDoc.data();
        const goals = userData.goals || {};

        // Access the existing BMR goal object
        const currentBMRGoal = goals.BMRGoals;

        if (!currentBMRGoal) {
            throw new Error('No BMR-related goal found in the user document.');
        }

        const { weight, height, birthdate, gender } = bodyProfileData;
        const age = new Date().getFullYear() - new Date(birthdate).getFullYear();

        // Calculate BMR based on gender
        let BMR;
        if (gender === 'Male') {
            BMR = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else if (gender === 'Female') {
            BMR = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        } else {
            throw new Error('Gender must be either "Male" or "Female".');
        }

        // Determine the activity level multiplier from the existing goal
        let activityMultiplier;
        switch (currentBMRGoal.activityLevel) {
            case 'Sedentary':
                activityMultiplier = 1.2;
                break;
            case 'Light':
                activityMultiplier = 1.375;
                break;
            case 'Moderate':
                activityMultiplier = 1.55;
                break;
            case 'Very':
                activityMultiplier = 1.725;
                break;
            case 'Super':
                activityMultiplier = 1.9;
                break;
            default:
                activityMultiplier = 1.55; // Default to moderate if not specified
        }

        // Calculate TDEE
        const TDEE = BMR * activityMultiplier;

        // Adjust for Weight Goals from the existing goal
        let calorieGoals;
        switch (currentBMRGoal.weightGoals) {
            case 'Maintain':
                calorieGoals = TDEE;
                break;
            case 'Weight Loss':
                calorieGoals = TDEE - 500; // Adjust to TDEE - 500 to TDEE - 1000 as needed
                break;
            case 'Weight Gain':
                calorieGoals = TDEE + 500; // Adjust to TDEE + 500 to TDEE + 1000 as needed
                break;
            default:
                calorieGoals = TDEE; // Default to maintenance if not specified
        }

        // Update the BMR goal object with the calculated calorieGoals
        goals.BMRGoals = {
            ...goals.BMRGoals,
            calorieGoals: Math.round(calorieGoals)
        };

        // Update the body profile information and goals in Firestore
        await setDoc(bodyProfileRef, {
            gender,
            birthdate,
            weight,
            height,
            bodyProfileComplete: true,
            goals: goals
        }, { merge: true });

    } catch (error) {
        throw new Error(`Error creating body profile: ${error.message}`);
    }
}


  static async fetchUsers() {
    try {
      const usersCollection = await getDocs(collection(db, 'users'));
      return usersCollection.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
      throw new Error('Failed to fetch users.');
    }
  }

  static async suspend(userId) {
    try {
      await updateDoc(doc(db, 'users', userId), { status: 'suspended' });
    } catch (error) {
      throw new Error('Failed to suspend user.');
    }
  }

  static async unsuspend(userId) {
    try {
      await updateDoc(doc(db, 'users', userId), { status: 'active' });
    } catch (error) {
      throw new Error('Failed to unsuspend user.');
    }
  }

  static async grantPremium(userId) {
    try {
      await updateDoc(doc(db, 'users', userId), { subscriptionType: "premium" });
    } catch (error) {
      throw new Error('Failed to give premium to user.');
    }
  }

  
  static async export() {
    try {
      const usersCollection = await getDocs(collection(db, 'users'));
      return usersCollection.docs.map(doc => doc.data());
    } catch (error) {
      throw new Error('Failed to fetch users.');
    }
  }
  
  static async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email)
    } catch(error) {
      throw new Error('Failed to reset password')
    }
  }

  static async fetchTotalLogsCount() {
    try {
      const usersCollection = await getDocs(collection(db, 'users'));
      let totalGlucoseLogsCount = 0;
      let totalMedicineLogsCount = 0;
      let totalMealLogsCount = 0;

      await Promise.all(usersCollection.docs.map(async (userDoc) => {
        const userId = userDoc.id;
        
        // Count documents in glucoseLogs subcollection
        const glucoseLogsCollection = await getDocs(collection(db, 'users', userId, 'glucoseLogs'));
        totalGlucoseLogsCount += glucoseLogsCollection.size;

        // Count documents in medicineLogs subcollection
        const medicineLogsCollection = await getDocs(collection(db, 'users', userId, 'medicineLogs'));
        totalMedicineLogsCount += medicineLogsCollection.size;

        // Count documents in mealLogs subcollection
        const mealLogsCollection = await getDocs(collection(db, 'users', userId, 'mealLogs'));
        totalMealLogsCount += mealLogsCollection.size;
      }));

      return {
        totalGlucoseLogsCount,
        totalMedicineLogsCount,
        totalMealLogsCount,
      };
    } catch (error) {
      throw new Error('Failed to fetch logs.');
    }
  }

  static async setBodyProfile(uid, gender, birthdate, weight, height){  
    try {
        const userDocRef = doc(db, 'users', uid);
        await setDoc(userDocRef, {
            gender,
            birthdate,
            weight,
            height
        }, { merge: true });
        return { uid, gender, birthdate, weight, height };
    } catch (error) {
        throw error;
    }
  };

  static async setAccountProfile(uid, updatedDetails){
    try {
        const userDocRef = doc(db, 'users', uid);
        await updateDoc(userDocRef, updatedDetails)
        console.log("Profile updated successfully");
    } catch (error) {
        throw error;
    }
  };

  static async setSubscribed(uid, subscriptionType){
    try {
        const userDocRef = doc(db, 'users', uid);
        await setDoc(userDocRef, {
            subscriptionType
        }, { merge: true });
        return { subscriptionType };
    } catch (error) {
        throw error;
    }
  };

  static async fetchTotalUsers() {
    try {
      const usersCollection = collection(db, 'users');
      const querySnapshot = await getDocs(usersCollection);
      const totalUsersCount = querySnapshot.size; // Get the number of documents in the snapshot
      return totalUsersCount;
    } catch (error) {
      console.error("Error fetching total users count: ", error);
      throw error;
    }
  }

  static async fetchActiveUser() {
    try {
      const q = query(collection(db, 'users'), where('status', '==', 'active'));
      const querySnapshot = await getDocs(q);
      const activeUserCount = querySnapshot.size; // Get the number of documents in the snapshot
      return activeUserCount;
    } catch (error) {
      throw error
    }
  }

  static async fetchPremiumUser() {
    try {
      const q = query(collection(db, 'users'), where('subscriptionType', '==', 'premium'));
      const querySnapshot = await getDocs(q);
      const premiumUserCount = querySnapshot.size; // Get the number of documents in the snapshot
      return premiumUserCount;
    } catch (error) {
      throw error
    }
  }

  static async setDiabetesType(uid, diabetesType){
    try{
      const userDocRef = doc(db, 'users', uid);
      await setDoc(userDocRef, {
        diabetesType
      },{merge: true});
      return {diabetesType};
    }catch(error){
      throw error;
    }
  };

  static async fetchPaymentDetails(userId) {
    try {
      const paymentDetailsCollection = await getDocs(collection(db, 'users', userId, 'paymentDetails'))
      return paymentDetailsCollection.docs.map(doc => ({ ...doc.data(), id:doc.id}))
    } catch(error) {
      throw error
    }
  }

  static async setPaymentDetails(userId, cardDetails) {
    try {
      const userPaymentCollection = collection(db, 'users', userId, 'paymentDetails');
      
      // Query for any existing default payment card
      const q = query(userPaymentCollection, where('default', '==', true));
      const querySnapshot = await getDocs(q);
      
      // Use a batch to update all existing default payment cards to false
      const batch = writeBatch(db);
      querySnapshot.forEach(doc => {
          batch.update(doc.ref, { default: false });
      });

      // Commit the batch
      await batch.commit();

      // Add the new payment card with default: true
      await addDoc(userPaymentCollection, cardDetails);
  } catch (error) {
      throw error;
  }
  }

  static async fetchAddress(userId){
    try{
      const addressDetailsCollection = await getDocs(collection(db, 'users', userId, 'addressDetails'))
      return addressDetailsCollection.docs.map(doc => ({...doc.data(), id:doc.id}))
    }catch(error){
      throw error
    }
  }
  
  static async setAddress (userId, addressDetails){
    try {
      const userAddressCollection = collection(db, 'users', userId, 'addressDetails');
      
      // Query for any existing default address
      const q = query(userAddressCollection, where('default', '==', true));
      const querySnapshot = await getDocs(q);
      
      // Use a batch to update all existing default addresses to false
      const batch = writeBatch(db);
      querySnapshot.forEach(doc => {
          batch.update(doc.ref, { default: false });
      });

      // Commit the batch
      await batch.commit();

      // Add the new address with default: true
      await addDoc(userAddressCollection, addressDetails);
  } catch (error) {
      throw error;
  }
  }

  static async fetchDefaultAddress (userId) {
    try {
      const userAddressCollection = collection(db, 'users', userId, 'addressDetails');
      const q = query(userAddressCollection, where('default', '==', true));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
          // Assuming there is only one default address
          const defaultAddress = querySnapshot.docs[0].data();
          return defaultAddress;
      } else {
          // No default address found
          return null;
      }
  } catch (error) {
      throw error;
  }
  }

  static async fetchDefaultPaymentDetails (userId) {
    try {
      const userPaymentCollection = collection(db, 'users', userId, 'paymentDetails');
      const q = query(userPaymentCollection, where('default', '==', true));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
          // Assuming there is only one default address
          const defaultPayment = querySnapshot.docs[0].data();
          return defaultPayment;
      } else {
          // No default address found
          return null;
      }
  } catch (error) {
      throw error;
  }
  }

  static async updatePaymentDetails (userId, cardDetails) {
    try {
      // Reference to the user's payment details collection
      const userPaymentCollection = collection(db, 'users', userId, 'paymentDetails');

      // Get all payment details for the user
      const paymentSnapshot = await getDocs(userPaymentCollection);

      // Create a batch to update multiple documents
      const batch = writeBatch(db)

      // Loop through each payment method and update its default status
      paymentSnapshot.forEach((doc) => {
        const paymentDocRef = doc.ref;

        // Check if the current document is the selected card
        if (doc.id === cardDetails.id) {
          // Set this card as the default
          batch.update(paymentDocRef, { default: true });
        } else {
          // Set all other cards to not default
          batch.update(paymentDocRef, { default: false });
        }
      });

      // Commit the batch operation
      await batch.commit();
      console.log('Payment details updated successfully.');
    } catch (error) {
      console.error('Error updating payment details:', error);
      throw error;
    }
  }

  static async deletePaymentDetails(userId, cardDetails) {
    try {
        // Reference to the specific payment detail document using the cardDetails.id
        const paymentDocRef = doc(db, 'users', userId, 'paymentDetails', cardDetails.id);

        // Delete the document
        await deleteDoc(paymentDocRef);

        console.log('Payment details deleted successfully.');
    } catch (error) {
        console.error('Error deleting payment details:', error);
        throw error;
    }
}
  
  static async fetchUserGoals (userId) {
    try {
      // Reference to the user's document in Firestore
      const bodyProfileRef = doc(db, 'users', userId);

      // Fetch the document
      const userDoc = await getDoc(bodyProfileRef);

      // Check if the document exists
      if (!userDoc.exists()) {
          throw new Error('User not found');
      }

      // Extract the necessary fields from the document data
      const userData = userDoc.data();
      const { height, weight, birthdate, goals, gender } = userData;

      // Return the fetched data
      return {
          height,
          weight,
          birthdate,
          goals,
          gender
      };

  } catch (error) {
      console.error('Error fetching body profile:', error);
      throw new Error(`Error fetching body profile: ${error.message}`);
  }
  }

  static async setUserGoals(userId, goals) {
    try {
      // Reference to the user's document in Firestore
      const userRef = doc(db, 'users', userId);

      // Update the user's goals in Firestore
      await setDoc(userRef, { goals }, { merge: true });

      console.log('User goals successfully updated');
    } catch (error) {
      console.error('Error updating user goals:', error);
      throw new Error('Failed to save user goals. Please try again.');
    }
  }

  static async updateAddress (userId, address) {
    const userAddressCollection = collection(db, 'users', userId, 'addressDetails');
    const batch = writeBatch(db);

    try {
      // Get all addresses
      const allAddressesSnapshot = await getDocs(userAddressCollection);

      // Set all addresses to not default
      allAddressesSnapshot.forEach((docSnapshot) => {
        batch.update(docSnapshot.ref, { default: false });
      });

      // Set the selected address as default
      const addressDocRef = doc(db, 'users', userId, 'addressDetails', address.id);
      batch.update(addressDocRef, { default: true });

      // Commit the batch
      await batch.commit();
    } catch (error) {
      console.error('Error updating address:', error);
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

  static async updateAddressDetails(userId, updatedAddress){
    try {
        // Extract the id from the updatedAddress object
        const { id, ...updatedAddressWithoutId } = updatedAddress;

        // Reference to the specific document in the Firestore
        const addressDocRef = doc(db, 'users', userId, 'addressDetails', id);

        // Update the document with the remaining fields
        await updateDoc(addressDocRef, updatedAddressWithoutId);

        console.log("Address updated successfully");
    } catch (error) {
        throw error;
    }
  };

  static async deleteLog(userId, logType, logId) {
    try {
      const logRef = doc(db, 'users', userId, logType, logId);
      await deleteDoc(logRef);
    } catch (error) {
      console.error('Error deleting log:', error);
      throw error;
    }
  }
}

export default User;

