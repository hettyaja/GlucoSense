import FoodOrder from "../Entity/FoodOrder"


class ViewUserFoodOrderController {
  static async viewFoodOrderByUserId(userId) {
    try {
      return await FoodOrder.fetchFoodOrderByUserId(userId)
    } catch (error) {
      throw error
    }
  }
}

export default ViewUserFoodOrderController