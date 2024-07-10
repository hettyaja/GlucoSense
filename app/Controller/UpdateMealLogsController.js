import MealLogs from "../Entity/MealLogs";

class UpdateMealLogsController {
    static async updateMealLogs(uid, mealData) {
        try {
            return await MealLogs.updateMealLogs(uid, mealData)
        } catch(error) {
            throw new Error(error.message)
        }
    }
}

export default UpdateMealLogsController