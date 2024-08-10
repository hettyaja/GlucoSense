import User from "../Entity/User";

class UpdateUserGoalsController {
  static async updateUserGoals(userId, updatedGoals) {
    try {
      return User.setUserGoals(userId, updatedGoals)
    } catch(error) {
      throw error
    }
  }
}

export default UpdateUserGoalsController