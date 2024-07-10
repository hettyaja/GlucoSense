import MealLogs from "../Entity/MealLogs";

class DeleteMealLogsController {
    static async deleteMealLogs(uid, mealLogId) {
        return await MealLogs.deleteMealLogs(uid, mealLogId)
    }
}

export default DeleteMealLogsController