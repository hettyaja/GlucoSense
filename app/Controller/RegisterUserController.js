import User from '../Entity/User';

class RegisterController {
  static async register(email, password, confirmPassword, additionalData) {
    try {
      // Validate inputs
      this.validateInputs(email, password, confirmPassword, additionalData);

      // Proceed with user registration
      return await User.register(email, password, additionalData);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('This email is already in use. Please use a different email.');
      } else if (error.code === 'auth/weak-password') {
          throw new Error('Password should be at least 6 characters.');
      } else if (error.code === 'auth/missing-password') {
          throw new Error('The password field cannot be empty.');
      } else if (error.code === 'auth/invalid-email') {
          throw new Error('Please input valid email.');
      } else {
          throw new Error(error.message);
      }
    }
  }

  static validateInputs(email, password, confirmPassword, additionalData) {
    if (!additionalData.username || additionalData.username.trim() === '') {
      throw new Error('Username cannot be empty');
    }

    if (!additionalData.name || additionalData.name.trim() === '') {
      throw new Error('Name cannot be empty');
    }

    if (!email || email.trim() === '') {
      throw new Error('Email cannot be empty');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
  }
}

export default RegisterController;
