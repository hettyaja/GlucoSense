import FoodOrder from "../Entity/FoodOrder"


class ViewBusinessPartnerFoodOrderController {
  static async viewFoodOrderByBusinessPartnerId(businessPartnerId) {
    try {
      return await FoodOrder.fetchFoodOrderByBusinessPartnerId(businessPartnerId)
    } catch(error) {
      throw error
    }
  }
}

export default ViewBusinessPartnerFoodOrderController