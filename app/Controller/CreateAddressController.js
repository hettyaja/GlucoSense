import User from "../Entity/User";

class CreateAddressController{
    static async createAddress(userId, addressDetails){
        try{
            return await User.setAddress(userId, addressDetails);
        }catch(error){
            throw error
        }
    }
}

export default CreateAddressController;