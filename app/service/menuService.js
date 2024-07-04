import { doc, getDocs, updateDoc, collection, query} from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust the import according to your file structure

export const fetchMenuData= async (uid) => {
  try {
    const docRef = collection(db, 'businessPartner', uid, 'menu');
    const q = query(docRef);
    const querySnapshot = await getDocs(q);
    const menu = [];
    querySnapshot.forEach((doc) => {
    menu.push({ id: doc.id, ...doc.data() })});
    return menu

  } catch (error) {
    console.error('Error fetching menu data:', error);
    throw error;
  }
};

