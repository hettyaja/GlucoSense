import { db } from '../../firebase';
import { doc, setDoc, deleteDoc, addDoc, collection, updateDoc} from 'firebase/firestore';

class MedicineLogs {
    constructor(id, time, medicine) {
        this.id = id
        this.time = time
        this.medicine = medicine
    }
}