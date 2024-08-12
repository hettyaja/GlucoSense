import User from "../Entity/User";

class updateAccountProfileController {
    static async setAccProfile(uid, photoUri, localName, localEmail, localUsername) {
        try {
            return await User.setAccountProfile(uid, photoUri, localName, localEmail, localUsername)
        } catch(error) {
            throw new Error(error.message)
        }
    }
}

export default updateAccountProfileController