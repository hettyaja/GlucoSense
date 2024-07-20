import BusinessPartner from '../Entity/BusinessPartner';

class ViewPendingAccountListController {
  static async getPendingAccounts() {
    try {
      return await BusinessPartner.getPendingAccounts();
    } catch (error) {
      console.error('Error in controller while fetching pending accounts:', error);
      throw error;
    }
  }
}

export default ViewPendingAccountListController;
