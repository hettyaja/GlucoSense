import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, deleteDoc, getDocs, updateDoc, Timestamp, collection } from 'firebase/firestore';
import { deleteUser as firebaseDeleteUser } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

class User {
  constructor(id, username, name, email, userType, registerTime, status, bodyProfileComplete) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.email = email;
    this.userType = userType;
    this.registerTime = registerTime;
    this.status = status;
    this.bodyProfileComplete = bodyProfileComplete;
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
        userType: 'free',
        registerTime: registerTime,
        status: 'active',
        bodyProfileComplete: false
      });
      return new User(user.uid, additionalData.username, additionalData.name, email, 'free', registerTime, 'active', false);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async login(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error(error.message);
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
      const userDocRef = doc(db, 'users', uid);
      await deleteDoc(userDocRef);
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

  static async createBodyProfile(uid, bodyProfileData) {
    try {
      const bodyProfileRef = doc(db, 'users', uid);
      await setDoc(bodyProfileRef, {
        gender: bodyProfileData.gender,
        birthdate: bodyProfileData.birthdate,
        weight: bodyProfileData.weight,
        height: bodyProfileData.height,
        bodyProfileComplete: true
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

  static async export() {
    try {
      const usersCollection = await getDocs(collection(db, 'users'));
      return usersCollection.docs.map(doc => doc.data());
    } catch (error) {
      throw new Error('Failed to fetch users.');
    }
  }
}

export default User;