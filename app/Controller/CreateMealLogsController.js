import MealLogs from "../Entity/MealLogs";

class CreateMealLogsController {
    static async createMealLogs(uid, mealData) {
        try {
            return await MealLogs.createMealLogs(uid, mealData)
        } catch(error) {
            throw new Error(error.message)
        }
    }
}

export default CreateMealLogsController