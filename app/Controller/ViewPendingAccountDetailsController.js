import BusinessPartner from "../Entity/BusinessPartner";

class ViewPendingAccountDetailsController {
  static async getDetails(id) {
    try {
      return await BusinessPartner.getDetails(id);
    } catch (error) {
      console.error('Error fetching business partner details:', error);
      throw new Error('Failed to fetch business partner details.');
    }
  }
}

export default ViewPendingAccountDetailsController;
