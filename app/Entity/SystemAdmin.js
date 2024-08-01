import {auth, db} from '../../firebase';
import {doc, getDoc} from 'firebase/firestore';


class SystemAdmin{
    constructor (id, email, name){
        this.id = id;
        this.email = email;
        this.name = name;
    }

    static async fetchAdminProfile(uid){
        try{
            const docRef = doc(db, 'systemAdmin', uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()){
                return docSnap.data();
            }else{
                console.log ('No Such Document!');
                return null;
            }
        }catch (error){
            console.error('Error fetching profile data:', error);
            throw error;
        }
    }}

export default SystemAdmin