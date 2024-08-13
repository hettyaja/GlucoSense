import { auth, db} from '../../firebase';
import {doc, addDoc, collection} from 'firebase/firestore';

class Order{
    static async createOrder(orderData){
        try{
            const orderCollection = collection(db, 'users', orderData.userId, 'foodOrders');
            await addDoc(orderCollection, orderData);
        } catch (error) {
            throw error
        }
    }

    static async createDietPlanOrder(orderData) {
        try {
            const orderCollection = collection(db, 'users', orderData.userId, 'dietPlanOrders')
            await addDoc(orderCollection, orderData)
        } catch(error) {
            throw error
        }
    }
}

export default Order