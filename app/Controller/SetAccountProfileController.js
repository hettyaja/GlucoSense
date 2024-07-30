import User from "../Entity/User";

class setAccountProfileController {
    static async setAccProfile(uid, localName, localEmail, localUsername) {
        try {
            return await User.setAccountProfile(uid, localName, localEmail, localUsername)
        } catch(error) {
            throw new Error(error.message)
        }
    }
}

export default setAccountProfileController