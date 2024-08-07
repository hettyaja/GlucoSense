import User from "../Entity/User";

class GetPaymentDetailsController {
  static async getPaymentDetails(userId) {
    try {
      return await User.fetchPaymentDetails(userId);
    } catch (error) {
      throw error
    }
  }

  static async getDefaultPaymentDetails(userId) {
    try {
      return await User.fetchDefaultPaymentDetails(userId);
    } catch(error) {
      throw error
    }
  }
}

export default GetPaymentDetailsController;
