import { auth, db} from '../../firebase';
import {doc, addDoc, collection, query, where, getDocs, updateDoc} from 'firebase/firestore';

class FoodOrder{
  constructor(orderRefNumber, userId, businessPartnerId,menuId, quantity,deliveryAddress,totalPayment,orderDate,status,notes) {
    this.orderRefNumber = orderRefNumber;
    this.userId = userId;
    this.businessPartnerId = businessPartnerId;
    this.menuId = menuId;
    this.quantity = quantity;
    this.deliveryAddress = deliveryAddress;
    this.totalPayment = totalPayment;
    this.orderDate = orderDate;
    this.status = status;
    this.notes = notes;
  }

    static async createOrder(orderData){
        try {
            const orderRef = await addDoc(collection(db, 'foodOrders'), orderData);
            return orderRef.id;  // Return the ID of the created order
          } catch(error) {
            throw error
          }
    }

    static async fetchFoodOrderByBusinessPartnerId(businessPartnerId) {
      try {
        const ordersRef = collection(db, 'foodOrders');  
        const q = query(ordersRef, where('businessPartnerId', '==', businessPartnerId));  // Query to get orders by businessPartner ID
        const ordersSnapshot = await getDocs(q);  // Fetch the matching documents
  

        const orders = ordersSnapshot.docs.map(doc => {
          const data = doc.data();
          return new FoodOrder(
            data.orderRefNumber,
            data.userId,
            data.businessPartnerId,
            data.menuId,
            data.quantity,
            data.deliveryAddress,
            data.totalPayment,
            data.orderDate.toDate(), // Convert Firestore Timestamp to JavaScript Date
            data.status,
            data.notes
          );
        });
  
        return orders;  // Return the array of orders
      } catch (error) {
        throw new Error('Failed to fetch all diet plan orders: ' + error.message);
      }
    }

    static async updateFoodOrder(orderId, updatedFoodOrder) {
      try {
        const orderRef = doc(db, 'foodOrders', orderId); // Get a reference to the specific order document
        await updateDoc(orderRef, updatedFoodOrder); // Update the document with the new data
        console.log('Order updated successfully');
      } catch (error) {
        throw new Error('Failed to update food order: ' + error.message);
      }
    }
    
}

export default FoodOrder