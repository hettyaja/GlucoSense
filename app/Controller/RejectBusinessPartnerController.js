import BusinessPartner from '../Entity/BusinessPartner';

class RejectBusinessPartnerController {
  static async rejectBusinessPartner(accountId) {
    try {
      return await BusinessPartner.rejectBusinessPartner(accountId);
    } catch (error) {
      console.error('Error rejecting business partner:', error);
      throw new Error('Failed to reject business partner.');
    }
  }
}

export default RejectBusinessPartnerController;
