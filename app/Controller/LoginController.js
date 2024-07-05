import User from '../Entity/User'

class LoginController {
    static async login(email, password) {
        try {
            return await User.login(email, password)
        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                throw new Error('The password is wrong. Please try again.');
            } else if (error.code === 'auth/invalid-email') {
                throw new Error('Please input a valid email.');
            } else {
                throw new Error(error.message);
            }
        }
    }
}

export default LoginController;