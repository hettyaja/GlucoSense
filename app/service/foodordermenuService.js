// service/foodordermenuService.js
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust the import according to your file structure

export const fetchMenuData = async () => {
  try {
    const menuCollection = [];
    const businessPartnersSnapshot = await getDocs(collection(db, 'businessPartner'));

    for (const businessPartnerDoc of businessPartnersSnapshot.docs) {
      const menuRef = collection(db, 'businessPartner', businessPartnerDoc.id, 'menu');
      const menuSnapshot = await getDocs(menuRef);

      menuSnapshot.forEach((menuDoc) => {
        const menuData = menuDoc.data();
        menuCollection.push({
          id: menuDoc.id,
          title: menuData.foodName || 'No Title',
          price: menuData.price || 'No Price',
          ...menuData
        });
      });
    }

    return menuCollection;
  } catch (error) {
    console.error('Error fetching menu data:', error);
    throw error;
  }
};

export const countFoodOrders = async () => {
  try {
    const menuCollection = await fetchMenuData();
    return menuCollection.length;
  } catch (error) {
    console.error('Error counting food orders:', error);
    throw error;
  }
};
