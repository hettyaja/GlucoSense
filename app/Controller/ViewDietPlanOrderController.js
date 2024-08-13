import DietPlanOrder from "../Entity/DietPlanOrder"

class ViewDietPlanOrderController {
  static async viewDietPlanOrderByBusinessPartnerId(businessPartnerId) {
    try {
      return await DietPlanOrder.fetchDietPlanOrderByBusinessPartnerId(businessPartnerId)
    } catch(error) {
      throw error
    }
  }
}

export default ViewDietPlanOrderController