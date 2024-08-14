import FoodOrder from "../Entity/FoodOrder"

class UpdateFoodOrderController {
  static async updateFoodOrder(businessPartnerId, updatedFoodData) {
    try {
      return await FoodOrder.updateFoodOrder(businessPartnerId, updatedFoodData)
    } catch(error) {
      throw error
    }
  }
}

export default UpdateFoodOrderController