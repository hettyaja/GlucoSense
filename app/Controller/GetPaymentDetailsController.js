import User from "../Entity/User";

class GetPaymentDetailsController {
  static async getPaymentDetails(userId) {
    try {
      return await User.fetchPaymentDetails(userId);
    } catch (error) {
      throw error
    }
  }
}

export default GetPaymentDetailsController;
