// entities/Menu.js
import {doc, deleteDoc, updateDoc} from 'firebase/firestore';
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

  static async updateMenu (userId, menuData){
    try{
      const menuRef = doc (db, 'businessPartner', userId, 'menu', menuData.id);
      await updateDoc(menuRef, {
        foodName : menuData.foodName,
        price : menuData.price,
        status : menuData.status,
        image : menuData.image,
        ingredients : menuData.ingredients,
        description: menuData.description,
        calories : menuData.calories,
        fat : menuData.fat,
        carbs : menuData.carbs
      });
      console.log ('Menu updated sucessfully: ', menuData);
    } catch (error){
      console.error ('Error updating menu log:', error);
      throw error;
    }
  }

  }
  
  export default Menu;
  