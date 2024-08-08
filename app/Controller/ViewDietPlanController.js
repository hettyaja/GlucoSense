import BusinessPartner from '../Entity/BusinessPartner';

class ViewDietPlanController {
  static async fetchDietPlans(userId) {
    return await BusinessPartner.fetchDietPlans(userId);
  }

  static async fetchAllDietPlans() {
    return await BusinessPartner.fetchAllDietPlans();
  }
}

export default ViewDietPlanController;
