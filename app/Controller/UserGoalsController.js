import User from "../Entity/User";

class UserGoalsController {
  static async fetchUserGoals(userId) {
    try {
      return User.fetchUserGoals(userId)
    } catch(error) {
      throw error
    }
  }

  static async saveUserGoals(userId, updatedGoals) {
    try {
      return User.setUserGoals(userId, updatedGoals)
    } catch(error) {
      throw error
    }
  }
}

export default UserGoalsController