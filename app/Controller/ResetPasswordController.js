import User from "../Entity/User";

class ResetPasswordController {
    static async resetPassword(email) {
        try {
            return await User.resetPassword(email)
        } catch(error) {
            throw new Error(error.message)
        }
    }
}

export default ResetPasswordController