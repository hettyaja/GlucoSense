import BusinessPartner from '../Entity/BusinessPartner';
import DietPlan from '../Entity/DietPlan';

class ViewDietPlanController {
  static async fetchDietPlans(userId) {
    return await BusinessPartner.fetchDietPlans(userId);
  }

  static async fetchAllDietPlans() {
    return await BusinessPartner.fetchAllDietPlans();
  }

  static async fetchAllDietPlansForUser() {
    try {
      return await DietPlan.fetchAllDietPlansForUser()
    } catch(error) {

    }
  }
}

export default ViewDietPlanController;
