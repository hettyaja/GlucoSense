import BusinessPartner from '../Entity/BusinessPartner';

class UpdateDietPlanController {
  static async updateDietPlan(userId, updatedDietPlan) {
    return await BusinessPartner.updateDietPlan(userId, updatedDietPlan);
  }
}

export default UpdateDietPlanController;
