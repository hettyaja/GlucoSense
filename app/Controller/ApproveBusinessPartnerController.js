import BusinessPartner from "../Entity/BusinessPartner";

class ApproveBusinessPartnerController {
  static async approve(uid) {
    try {
      return await BusinessPartner.approveBusinessPartner(uid);
    } catch (error) {
      console.error("Error approving business partner: ", error);
      throw new Error('Failed to approve business partner.');
    }
  }
}

export default ApproveBusinessPartnerController;
