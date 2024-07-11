import Menu from "../Entity/Menu";

class DeleteMenuController{
    static async deleteMenu(uid, menuId) {
        try {
            return await Menu.deleteMenu(uid, menuId)
        } catch (error) {
            throw new Error(error.message);
        }
    }

}

export default DeleteMenuController