import Menu from "../Entity/Menu";

class ViewMenuController {
    static async viewMenu(uid) {
        try {
            return await Menu.fetchMenu(uid)
        } catch(error) {
            throw new Error(error.message);
        }
    }

    static async viewAllMenu() {
        try {
            return await Menu.fetchAllMenu()
        } catch(error) {
            throw error
        }
    }
    
}

export default ViewMenuController