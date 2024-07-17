import BusinessPartner from "../Entity/BusinessPartner";

class SuspendBusinessPartnerController {
  static async suspend(id) {
    try {
      return await BusinessPartner.suspendBusinessPartner(id);
    } catch (error) {
      console.error("Error suspending business partner: ", error);
      throw new Error('Failed to suspend business partner.');
    }
  }
}

export default SuspendBusinessPartnerController;
