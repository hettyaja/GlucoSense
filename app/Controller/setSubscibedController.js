import User from "../Entity/User";

class setSubscribedController {
    static async setSubbed(uid, subscriptionType) {
        try {
            return await User.setSubscribed(uid, subscriptionType)
        } catch(error) {
            throw new Error(error.message)
        }
    }
}

export default setSubscribedController