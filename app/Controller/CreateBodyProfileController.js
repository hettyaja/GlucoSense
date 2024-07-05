import User from '../Entity/User'

class CreateBodyProfileController {
    static async createBodyProfile(uid, bodyProfileData) {
        try {
            return await User.createBodyProfile(uid, bodyProfileData)
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default CreateBodyProfileController;