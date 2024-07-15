// src/controllers/businessController.js
import { db } from '../firebase'; // Adjust the path according to your project structure
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export const fetchBusinessPartners = async () => {
  try {
    const businessPartnersCollection = await getDocs(collection(db, 'businessPartners'));
    return businessPartnersCollection.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error("Error fetching business partners: ", error);
    return [];
  }
};

export const fetchPendingAccounts = async () => {
  try {
    const pendingAccountsCollection = await getDocs(collection(db, 'pendingAccounts'));
    return pendingAccountsCollection.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error("Error fetching pending accounts: ", error);
    return [];
  }
};

export const fetchAccountDetails = async (id) => {
  try {
    const accountDoc = await getDoc(doc(db, 'pendingAccounts', id));
    return accountDoc.exists() ? accountDoc.data() : null;
  } catch (error) {
    console.error("Error fetching account details: ", error);
    return null;
  }
};
