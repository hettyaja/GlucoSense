import BusinessPartner from "../Entity/BusinessPartner";

class UpdateBpProfileController{
    static async updateBpProfile(uid, profileData){
        try{
            return await BusinessPartner.updateProfileBp(uid,profileData)
        }catch(error){
            throw new Error(error.message);
        }
    }
}
export default UpdateBpProfileController