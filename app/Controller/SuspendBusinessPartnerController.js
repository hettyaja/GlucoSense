import BusinessPartner from "../Entity/BusinessPartner";

class SuspendBusinessPartnerController {
  static async suspend(uid) {
    try {
      return await BusinessPartner.suspendBusinessPartner(uid);
    } catch (error) {
      console.error('Error suspending business partner:', error);
      throw new Error('Failed to suspend business partner.');
    }
  }
}

export default SuspendBusinessPartnerController;
