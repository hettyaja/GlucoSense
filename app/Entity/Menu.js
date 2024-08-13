// entities/Menu.js
import {doc, deleteDoc, updateDoc, collection, addDoc, getDoc} from 'firebase/firestore';
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
    
  }
  
  export default Menu;
  