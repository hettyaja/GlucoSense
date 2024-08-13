import { auth, db} from '../../firebase';
import {collection, getDocs, query, where, addDoc} from 'firebase/firestore';

class DietPlanOrder {
  constructor(orderRefNumber, userId, businessPartnerId, dietPlanId, quantity, deliveryAddress, totalPayment, startDate, endDate, notes) {
    this.orderRefNumber = orderRefNumber;
    this.userId = userId;
    this.businessPartnerId = businessPartnerId;
    this.dietPlanId = dietPlanId;
    this.quantity = quantity;
    this.deliveryAddress = deliveryAddress;
    this.totalPayment = totalPayment;
    this.startDate = startDate;
    this.endDate = endDate;
    this.notes = notes;
  }

  static async createDietPlanOrder(orderData) {
    try {
      const orderRef = await addDoc(collection(db, 'dietPlanOrders'), orderData);
      return orderRef.id;  // Return the ID of the created order
    } catch(error) {
      throw error
    }
  }

  static async fetchDietPlanOrderByBusinessPartnerId(businessPartnerId) {
    try {
      const ordersRef = collection(db, 'dietPlanOrders');  // Reference to the dietPlanOrders collection
      const q = query(ordersRef, where('businessPartnerId', '==', businessPartnerId));  // Query to get orders by businessPartner ID
      const ordersSnapshot = await getDocs(q);  // Fetch the matching documents

      // Map over the documents and return an array of DietPlanOrder instances
      const orders = ordersSnapshot.docs.map(doc => {
        const data = doc.data();
        return new DietPlanOrder(
          data.orderRefNumber,
          data.userId,
          data.businessPartnerId,
          data.dietPlanId,
          data.quantity,
          data.deliveryAddress,
          data.totalPayment,
          data.startDate.toDate(),  // Convert Firestore Timestamp to JavaScript Date
          data.endDate.toDate(),    // Convert Firestore Timestamp to JavaScript Date
          data.notes
        );
      });

      return orders;  // Return the array of orders
    } catch (error) {
      throw new Error('Failed to fetch all diet plan orders: ' + error.message);
    }
  }

  static async fetchDietPlanOrderByUserId(userId) {
    try {
      const ordersRef = collection(db, 'dietPlanOrders');  // Reference to the dietPlanOrders collection
      const q = query(ordersRef, where('userId', '==', userId));  // Query to get orders by user ID
      const ordersSnapshot = await getDocs(q);  // Fetch the matching documents

      // Map over the documents and return an array of DietPlanOrder instances
      const orders = ordersSnapshot.docs.map(doc => {
        const data = doc.data();
        return new DietPlanOrder(
          data.orderRefNumber,
          data.userId,
          data.businessPartnerId,
          data.dietPlanId,
          data.quantity,
          data.deliveryAddress,
          data.totalPayment,
          data.startDate.toDate(),  // Convert Firestore Timestamp to JavaScript Date
          data.endDate.toDate(),    // Convert Firestore Timestamp to JavaScript Date
          data.notes
        );
      });

      return orders;  // Return the array of orders
    } catch (error) {
      throw new Error('Failed to fetch diet plan orders for user: ' + error.message);
    }
  }

}

export default DietPlanOrder