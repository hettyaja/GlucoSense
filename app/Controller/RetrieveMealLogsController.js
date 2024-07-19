import MealLogs from "../Entity/MealLogs";

class RetrieveMealLogsController {
    static async retrieveMealLogs(uid) {
        try {
            return await MealLogs.fetchMealLogsForInsight(uid)
        } catch(error) {
            throw new Error(error.message);
        }
    }
}

export default RetrieveMealLogsController