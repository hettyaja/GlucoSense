import User from '../Entity/User'

class LogoutController {
    static async logout() {
        try {
            return await User.logout()
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default LogoutController;