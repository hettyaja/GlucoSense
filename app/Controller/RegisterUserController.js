import User from '../Entity/User';

class RegisterUserController {
  static async register(email, password, confirmPassword, additionalData) {
    try {
      // Validate inputs
      this.validateInputs(email, password, confirmPassword, additionalData);

      // Proceed with user registration
      return await User.register(email, password, additionalData);
    } catch (error) {
          throw new Error(error.message);
    }
  }

  static validateInputs(email, password, confirmPassword, additionalData) {
    if (!additionalData.username || additionalData.username.trim() === '') {
      throw new Error('Username cannot be empty');
    }

    if (!additionalData.name || additionalData.name.trim() === '') {
      throw new Error('Name cannot be empty');
    }
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
  }
}

export default RegisterUserController;
