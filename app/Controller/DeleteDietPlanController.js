import BusinessPartner from '../Entity/BusinessPartner';

class DeleteDietPlanController {
  static async deleteDietPlan(userId, dietPlanId) {
    return await BusinessPartner.deleteDietPlan(userId, dietPlanId);
  }
}

export default DeleteDietPlanController;
