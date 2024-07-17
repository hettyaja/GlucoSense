import BusinessPartner from '../Entity/BusinessPartner';

class CreateDietPlanController {
  static async createDietPlan(userId, newDietPlan) {
    return await BusinessPartner.createDietPlan(userId, newDietPlan);
  }
}

export default CreateDietPlanController;
