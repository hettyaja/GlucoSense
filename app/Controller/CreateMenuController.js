import Menu from "../Entity/Menu";

class CreateMenuController{
    static async createMenu(uid, menuData){
        try{
            return await Menu.createMenu(uid, menuData)
        }catch(error){
            throw new Error (error.message)
        }
    }
}

export default CreateMenuController