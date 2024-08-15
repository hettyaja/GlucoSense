// entities/Menu.js
import {doc, deleteDoc, updateDoc, collection, addDoc, getDoc, getDocs} from 'firebase/firestore';
import {db} from '../../firebase';
class Menu {
    constructor(foodName, price, ingredients, photoURL) {
      this.foodName = foodName;
      this.price = price;
      this.ingredients = ingredients;
      this.photoURL = photoURL;
    }

    static async createMenu(userId, menuData){
      try{
        const menuRef = collection(db, 'businessPartner', userId, 'menu');
        await addDoc (menuRef, menuData);
      }catch (error){
        throw error;
      }
    }

    static async deleteMenu (userId, menuId){
      try {
        const menuRef = doc(db, 'businessPartner', userId, 'menu', menuId);
        await deleteDoc(menuRef);
      } catch (error) {
        console.error('Error deleting menu:asd', error);
        throw error;
      }
    };

    static async updateMenu (userId, menuData){
      try{
        const { id, ...menuDataWithoutId } = menuData; // Destructure to exclude `id`
        const menuRef = doc (db, `businessPartner/${userId}/menu`, id);
        await updateDoc(menuRef, menuDataWithoutId);
        console.log ('Menu updated sucessfully: ', menuData);
      } catch (error){
        console.error ('Error updating menu log:', error);
        throw error;
      }
    };

    static async fetchMenu(bpId, menuId) {
        try {
          // Reference to the specific menu document within the 'menu' collection of the 'businessPartner'
          const menuDocRef = doc(db, 'businessPartner', bpId, 'menu', menuId);
          const menuDoc = await getDoc(menuDocRef);
    
          if (menuDoc.exists()) {
            // Return the menu data if the document exists
            return { id: menuDoc.id, ...menuDoc.data() };
          } else {
            throw new Error('Menu item does not exist');
          }
    
        } catch (error) {
          console.error('Error fetching menu item:', error);
          throw error;
        }
    }

    static async fetchAllMenu() {
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
              bpId:businessPartnerDoc.id,
              entityName: businessPartnerDoc.data().entityName,
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
    }
  }
  
  export default Menu;
  