// entities/Menu.js
import {doc, deleteDoc} from 'firebase/firestore';
import {db} from '../../firebase';
class Menu {
    constructor(foodName, price, ingredients, photoURL) {
      this.foodName = foodName;
      this.price = price;
      this.ingredients = ingredients;
      this.photoURL = photoURL;
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

  }
  
  export default Menu;
  