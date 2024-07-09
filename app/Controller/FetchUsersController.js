import User from '../Entity/User';

class FetchUsersController {
  static async fetchUsers() {
    try {
      return await User.fetchUsers();
    } catch (error) {
      console.error("Error fetching users: ", error);
      throw new Error('Failed to fetch users.');
    }
  }
}

export default FetchUsersController;
