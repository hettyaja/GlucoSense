import BusinessPartner from "../Entity/BusinessPartner";

class SuspendBusinessPartnerController {
  static async suspendBusinessPartner(id) {
    try {
      return await BusinessPartner.suspend(id);
    } catch (error) {
      console.error("Error suspending business partner: ", error);
      throw new Error('Failed to suspend business partner.');
    }
  }
}

export default SuspendBusinessPartnerController;
