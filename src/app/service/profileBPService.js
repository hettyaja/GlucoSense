import { doc, getDoc, updateDoc } from 'firebase/firestore';
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

export const updateProfile = async(uid, profileData)=>{
  try{
    const profileRef = doc(db,'businessPartner', uid);
      await updateDoc(profileRef, profileData)
      console.log("Profile updated sucessfully");
  }catch(error){
      console.error("Error updating profile", error);
  }
};