import User from '../Entity/User'

class DeleteUserController {
    static async deleteUser(uid) {
        try {
            return await User.deleteUser(uid)
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default DeleteUserController;