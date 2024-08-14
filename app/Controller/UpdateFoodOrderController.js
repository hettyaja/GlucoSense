import FoodOrder from "../Entity/FoodOrder"

class UpdateFoodOrderController {
  static async updateFoodOrder(businessPartnerId, updatedFoodData) {
    try {
      return await FoodOrder.updateFoodOrder(businessPartnerId)
    } catch(error) {
      throw error
    }
  }
}

export default UpdateFoodOrderController