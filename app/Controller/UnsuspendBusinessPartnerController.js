import BusinessPartner from "../Entity/BusinessPartner";

class UnsuspendBusinessPartnerController {
  static async unsuspend(uid) {
    try {
      return await BusinessPartner.unsuspendBusinessPartner(uid);
    } catch (error) {
      console.error("Error unsuspending business partner: ", error);
      throw new Error('Failed to unsuspend business partner.');
    }
  }
}

export default UnsuspendBusinessPartnerController;
