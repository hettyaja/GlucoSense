import SystemAdmin from "../Entity/SystemAdmin"

class ViewProfileAdminController {
    static async viewProfileAdmin(uid) {
      try {
        return await SystemAdmin.fetchAdminProfile(uid);
      } catch (error) {
        console.error('Error fetching Admin profile:', error);
        throw new Error('Failed to fetch Admin profile.');
      }
    }
  }

export default ViewProfileAdminController