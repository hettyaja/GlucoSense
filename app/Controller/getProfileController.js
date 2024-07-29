import User from '../Entity/User';

class getProfileController {
  static async getProfile(uid) {
    try {

      return await User.fetchProfile(uid);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default getProfileController;