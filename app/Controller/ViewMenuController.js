import Menu from "../Entity/Menu";

class ViewMenuController {
    static async viewAllMenu() {
        try {
            return await Menu.fetchAllMenu()
        } catch(error) {
            throw new Error(error.message);
        }
    }
}

export default ViewMenuController