import User from "../Entity/User";

class ViewUserGoalsController {
  static async viewUserGoals(userId) {
    try {
      return User.fetchUserGoals(userId)
    } catch(error) {
      throw error
    }
  }
}

export default ViewUserGoalsController