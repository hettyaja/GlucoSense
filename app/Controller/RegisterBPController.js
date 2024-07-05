import BusinessPartner from '../Entity/BusinessPartner';

class RegisterBPController {
  static async register(email, password, confirmPassword, additionalData) {
    try {
      // Validate inputs
      this.validateInputs(email, password, confirmPassword, additionalData);

      // Proceed with user registration
      return await BusinessPartner.register(email, password, additionalData);
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
    if (!additionalData.entityName || additionalData.entityName.trim() === '') {
      throw new Error('Entity name cannot be empty');
    }

    if (!additionalData.UEN || additionalData.UEN.trim() === '') {
      throw new Error('UEN cannot be empty');
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

export default RegisterBPController;
