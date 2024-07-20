import BusinessPartner from '../Entity/BusinessPartner';

class UpdateAccountStatusController {
  static async updateAccountStatus(id, status) {
    try {
      return await BusinessPartner.updateAccountStatus(id, status);
    } catch (error) {
      console.error(`Error in controller while updating account status to ${status}:`, error);
      throw error;
    }
  }
}

export default UpdateAccountStatusController;
