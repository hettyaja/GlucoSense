import Menu from "../Entity/Menu"

class MenuDetailsController{
    static async fetchMenu (bpId, menuId){
        try{
            return await Menu.fetchMenu(bpId, menuId)
        }catch(error){
            throw new Error (error.message)
        }
    }
}

export default MenuDetailsController