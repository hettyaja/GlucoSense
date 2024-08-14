import { auth, db} from '../../firebase';
import {doc, addDoc, collection, query, where, getDoc, getDocs, updateDoc} from 'firebase/firestore';

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

    static async fetchFoodOrderByUserId(userId) {
      try {
        // Step 1: Fetch all food orders by user ID
        const ordersRef = collection(db, 'foodOrders');  
        const q = query(ordersRef, where('userId', '==', userId));
        const ordersSnapshot = await getDocs(q);
    
        // Step 2: For each order, fetch the related business partner and menu data
        const orders = await Promise.all(ordersSnapshot.docs.map(async (docSnapshot) => {
          const data = docSnapshot.data();
          const orderId = docSnapshot.id;
    
          // Fetch Business Partner Data
          const businessPartnerDocRef = doc(db, 'businessPartner', data.businessPartnerId);
          const businessPartnerDoc = await getDoc(businessPartnerDocRef);
          const businessPartnerData = businessPartnerDoc.exists() ? businessPartnerDoc.data() : null;
    
          // Fetch Menu Data from the subcollection within the Business Partner document
          let menuData = null;
          if (businessPartnerDoc.exists()) {
            const menuDocRef = doc(db, `businessPartner/${data.businessPartnerId}/menu`, data.menuId);
            const menuDoc = await getDoc(menuDocRef);
            menuData = menuDoc.exists() ? menuDoc.data() : null;
          }
    
          // Return an object containing the order, business partner, and menu data
          return {
            orderId,
            orderRefNumber: data.orderRefNumber,
            userId: data.userId,
            businessPartnerId: data.businessPartnerId,
            businessPartnerName: businessPartnerData ? businessPartnerData.entityName : 'Unknown',
            menuId: data.menuId,
            menuName: menuData ? menuData.foodName : 'Unknown',
            menuImage: menuData ? menuData.image : '',
            quantity: data.quantity,
            deliveryAddress: data.deliveryAddress,
            totalPayment: data.totalPayment,
            orderDate: data.orderDate.toDate(), // Convert Firestore Timestamp to JavaScript Date
            status: data.status,
            notes: data.notes,
          };
        }));
    
        return orders;  // Return the array of enriched orders
      } catch (error) {
        throw new Error('Failed to fetch food orders: ' + error.message);
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