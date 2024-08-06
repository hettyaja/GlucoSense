import User from "../Entity/User";

class CreatePaymentDetailsController {
  static async createPaymentDetails(userId, cardDetails) {
    try {
      return await User.setPaymentDetails(userId, cardDetails);
    } catch (error) {
      throw error
    }
  }
}

export default CreatePaymentDetailsController;
