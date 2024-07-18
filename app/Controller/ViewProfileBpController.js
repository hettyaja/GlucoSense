import BusinessPartner from "../Entity/BusinessPartner";

class ViewProfileBpController {
    static async viewProfileBp(uid) {
      try {
        return await BusinessPartner.fetchBPProfile(uid);
      } catch (error) {
        console.error('Error fetching BP profile:', error);
        throw new Error('Failed to fetch BP profile.');
      }
    }
  }

export default ViewProfileBpController