import BusinessPartner from "../Entity/BusinessPartner";

class UnsuspendBusinessPartnerController {
  static async unsuspend(id) {
    try {
      return await BusinessPartner.unsuspendBusinessPartner(id);
    } catch (error) {
      console.error("Error unsuspending business partner: ", error);
      throw new Error('Failed to unsuspend business partner.');
    }
  }
}

export default UnsuspendBusinessPartnerController;
