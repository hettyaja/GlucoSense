import MealLogs from "../Entity/MealLogs";

class UpdateMealController {
    static async updateMealLogs(uid, mealData) {
        try {
            return await MealLogs.updateMealLogs(uid, mealData)
        } catch(error) {
            throw new Error(error.message)
        }
    }
}

export default UpdateMealController