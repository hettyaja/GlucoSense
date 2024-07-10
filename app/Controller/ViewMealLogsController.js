import MealLogs from "../Entity/MealLogs";

class ViewMealLogsController {
    static async viewMealLogs(uid) {
        try {
            return await MealLogs.fetchMealLogs(uid)
        } catch(error) {
            throw new Error(error.message);
        }
    }
}

export default ViewMealLogsController