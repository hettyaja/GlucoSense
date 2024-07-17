import BusinessPartner from "../Entity/BusinessPartner";

class RejectBusinessPartnerController {
  static async reject(uid) {
    try {
      return await BusinessPartner.rejectBusinessPartner(uid);
    } catch (error) {
      console.error("Error rejecting business partner: ", error);
      throw new Error('Failed to reject business partner.');
    }
  }
}

export default RejectBusinessPartnerController;

