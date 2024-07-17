import BusinessPartner from '../Entity/BusinessPartner';

class ViewPendingAccountDetailsController {
  static async getDetails(accountId) {
    try {
      return await BusinessPartner.getPendingDetails(accountId);
    } catch (error) {
      console.error('Error fetching pending account details:', error);
      throw new Error('Failed to fetch pending account details.');
    }
  }

  static async getPendingAccounts() {
    try {
      return await BusinessPartner.getPendingAccounts();
    } catch (error) {
      console.error('Error fetching pending accounts:', error);
      throw new Error('Failed to fetch pending accounts.');
    }
  }
}

export default ViewPendingAccountDetailsController;
