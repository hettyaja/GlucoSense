import User from '../Entity/User';

class LoginController {
  static async login(email, password) {
    try {
      return await User.login(email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default LoginController;