import MealLogs from "../Entity/MealLogs";

class DeleteMealController {
    static async deleteMealLogs(uid, mealLogId) {
        return await MealLogs.deleteMealLogs(uid, mealLogId)
    }
}

export default DeleteMealController