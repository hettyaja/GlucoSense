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

    // if (!email || email.trim() === '') {
    //   throw new Error('Email cannot be empty');
    // }

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   throw new Error('Invalid email format');
    // }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
  }
}

export default RegisterUserController;
