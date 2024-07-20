import BusinessPartner from '../Entity/BusinessPartner';

class UpdateAccountStatusController {
  static async updateAccountStatus(id) {
    try {
      return await BusinessPartner.approveBusinessPartner(id);
    } catch (error) {
      console.error(`Error in controller while updating account status to ${status}:`, error);
      throw error;
    }
  }
}

export default UpdateAccountStatusController;
