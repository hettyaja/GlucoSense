import DietPlanOrder from "../Entity/DietPlanOrder"

class ViewUserDietPlanOrderController {
  static async viewDietPlanOrderByUserId(userId) {
    try {
      return await DietPlanOrder.fetchDietPlanOrderByUserId(userId)
    } catch (error) {
      throw error
    }
  }
}

export default ViewUserDietPlanOrderController