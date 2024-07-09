import User from '../Entity/User';

class SuspendUserController {
  static async suspendUser(userId) {
    try {
      return await User.suspend(userId);
    } catch (error) {
      console.error("Error suspending user: ", error);
      throw new Error('Failed to suspend user.');
    }
  }
}

export default SuspendUserController;
