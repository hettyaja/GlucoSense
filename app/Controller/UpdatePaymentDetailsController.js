import User from "../Entity/User";

class UpdatePaymentDetailsController {
  static async updatePaymentDetails(userId, cardDetails) {
    try {
      return await User.updatePaymentDetails(userId, cardDetails);
    } catch (error) {
      throw error
    }
  }

}

export default UpdatePaymentDetailsController;