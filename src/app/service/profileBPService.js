import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase'; // Adjust the import according to your file structure

export const fetchBPProfile = async (uid) => {
  try {
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
};