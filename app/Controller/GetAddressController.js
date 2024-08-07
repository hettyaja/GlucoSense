import User from "../Entity/User";

class GetAddressController {
    static async getAddress (userId){
        try{
            return await User.fetchAddress(userId);
        }catch(error){
            throw error
        }
    }

    static async getDefaultAddress(userId){
        try {
            return await User.fetchDefaultAddress(userId);
        } catch (error) {
            throw error
        }
    }
}

export default GetAddressController;
