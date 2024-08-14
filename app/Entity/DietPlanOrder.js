import { auth, db} from '../../firebase';
import {doc, collection, getDoc, getDocs, query, where, addDoc} from 'firebase/firestore';

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
      // Step 1: Fetch all diet plan orders by user ID
      const ordersRef = collection(db, 'dietPlanOrders');  
      const q = query(ordersRef, where('userId', '==', userId));
      const ordersSnapshot = await getDocs(q);
  
      // Step 2: For each order, fetch the related business partner and diet plan data
      const orders = await Promise.all(ordersSnapshot.docs.map(async (docSnapshot) => {
        const data = docSnapshot.data();
        const orderId = docSnapshot.id;
  
        // Fetch Business Partner Data
        const businessPartnerDocRef = doc(db, 'businessPartner', data.businessPartnerId);
        const businessPartnerDoc = await getDoc(businessPartnerDocRef);
        const businessPartnerData = businessPartnerDoc.exists() ? businessPartnerDoc.data() : null;
  
        // Fetch Diet Plan Data from the subcollection within the Business Partner document
        let dietPlanData = null;
        if (businessPartnerDoc.exists()) {
          const dietPlanDocRef = doc(db, `businessPartner/${data.businessPartnerId}/dietplan`, data.dietPlanId);
          const dietPlanDoc = await getDoc(dietPlanDocRef);
          dietPlanData = dietPlanDoc.exists() ? dietPlanDoc.data() : null;
        }
  
        // Return an object containing the order, business partner, and diet plan data
        return {
          orderId,
          orderRefNumber: data.orderRefNumber,
          userId: data.userId,
          businessPartnerId: data.businessPartnerId,
          businessPartnerName: businessPartnerData ? businessPartnerData.entityName : 'Unknown',
          dietPlanId: data.dietPlanId,
          dietPlanName: dietPlanData ? dietPlanData.planName : 'Unknown',
          dietPlanImage: dietPlanData ? dietPlanData.planImage : '',
          quantity: data.quantity,
          deliveryAddress: data.deliveryAddress,
          totalPayment: data.totalPayment,
          startDate: data.startDate.toDate(), // Convert Firestore Timestamp to JavaScript Date
          endDate: data.endDate.toDate(), // Convert Firestore Timestamp to JavaScript Date
          notes: data.notes,
        };
      }));
  
      return orders;  // Return the array of enriched orders
    } catch (error) {
      throw new Error('Failed to fetch diet plan orders: ' + error.message);
    }
  }

}

export default DietPlanOrder