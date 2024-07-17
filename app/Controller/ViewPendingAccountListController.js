import BusinessPartner from '../Entity/BusinessPartner';

class ViewPendingAccountListController {
  static async getPendingAccounts() {
    try {
      return await BusinessPartner.getPendingAccounts();
    } catch (error) {
      console.error('Error fetching pending accounts:', error);
      throw new Error('Failed to fetch pending accounts.');
    }
  }
}

export default ViewPendingAccountListController;
