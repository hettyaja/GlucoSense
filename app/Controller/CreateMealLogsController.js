import MealLogs from "../Entity/MealLogs";

class CreateMealLogsController {
    static async createMeal(uid, mealData) {
        try {
            return await MealLogs.createMealLogs(uid, mealData)
        } catch(error) {
            throw new Error(error.message)
        }
    }
}

export default CreateMealLogsController