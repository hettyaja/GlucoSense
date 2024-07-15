import Menu from "../Entity/Menu";

class UpdateMenuController{
    static async updateMenu(uid, menuData){
        try{
            return await Menu.updateMenu(uid, menuData)
        } catch (error){
            throw new Error (error.message)
        }
    }
}

export default UpdateMenuController