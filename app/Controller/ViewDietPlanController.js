import BusinessPartner from '../Entity/BusinessPartner';

class ViewDietPlanController {
  static async fetchDietPlans(userId) {
    return await BusinessPartner.fetchDietPlans(userId);
  }
}

export default ViewDietPlanController;
