import User from '../Entity/User';

class UnsuspendUserController {
  static async unsuspendUser(userId) {
    try {
      return await User.unsuspend(userId);
    } catch (error) {
      console.error("Error unsuspending user: ", error);
      throw new Error('Failed to unsuspend user.');
    }
  }
}

export default UnsuspendUserController;


