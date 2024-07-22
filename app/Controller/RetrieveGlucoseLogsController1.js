import GlucoseLogs from "../Entity/GlucoseLogs";

class RetrieveGlucoseLogsController1 {
    static async retrieveGlucoseLogs(uid, period) {
        try {
            return await GlucoseLogs.fetchGlucoseLogsForDataInsight(uid, period)
        } catch(error) {
            throw new Error(error.message);
        }
    }
}

export default RetrieveGlucoseLogsController1