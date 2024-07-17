import BusinessPartner from '../Entity/BusinessPartner';

class UpdateDietPlanController {
  static async updateDietPlan(userId, dietPlanId, updatedDietPlan) {
    return await BusinessPartner.updateDietPlan(userId, dietPlanId, updatedDietPlan);
  }
}

export default UpdateDietPlanController;
