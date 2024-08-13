import DietPlanOrder from "../Entity/DietPlanOrder"


class CreateDietPlanOrderController {
  static async createDietPlanOrder(orderData) {
    try {
        return DietPlanOrder.createDietPlanOrder(orderData)
    } catch (error) {
        throw error
    }
  }
}

export default CreateDietPlanOrderController