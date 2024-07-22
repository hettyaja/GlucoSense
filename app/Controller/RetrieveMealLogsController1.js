import MealLogs from "../Entity/MealLogs";

class RetrieveMealLogsController1 {
    static async retrieveMealLogs(uid, period) {
        try {
            return await MealLogs.fetchMealLogsForDataInsight(uid, period)
        } catch(error) {
            throw new Error(error.message);
        }
    }
}

export default RetrieveMealLogsController1