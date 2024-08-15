import User from "../Entity/User";

class DeletePaymentDetailsController {
  static async deletePaymentDetails(userId, cardDetails) {
    try {
      return await User.deletePaymentDetails(userId, cardDetails);
    } catch (error) {
      throw error
    }
  }

}

export default DeletePaymentDetailsController;