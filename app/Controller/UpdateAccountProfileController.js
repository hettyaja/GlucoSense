import User from "../Entity/User";

class updateAccountProfileController {
    static async setAccProfile(uid, updatedDetails) {
        try {
            return await User.setAccountProfile(uid, updatedDetails)
        } catch(error) {
            throw new Error(error.message)
        }
    }
}

export default updateAccountProfileController