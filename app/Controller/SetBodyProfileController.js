import User from "../Entity/User";

class setBodyProfileController {
    static async setBodProfile(uid, localGender, localBirthdate, localWeight, localHeight) {
        try {
            return await User.setBodyProfile(uid, localGender, localBirthdate, localWeight, localHeight)
        } catch(error) {
            throw new Error(error.message)
        }
    }
}

export default setBodyProfileController