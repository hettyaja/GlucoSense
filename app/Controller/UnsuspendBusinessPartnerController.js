import BusinessPartner from "../Entity/BusinessPartner";

class UnsuspendBusinessPartnerController {
  static async unsuspendBusinessPartner(id) {
    try {
      return await BusinessPartner.unsuspend(id);
    } catch (error) {
      console.error("Error unsuspending business partner: ", error);
      throw new Error('Failed to unsuspend business partner.');
    }
  }
}

export default UnsuspendBusinessPartnerController;
