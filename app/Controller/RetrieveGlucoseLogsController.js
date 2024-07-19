import GlucoseLogs from "../Entity/GlucoseLogs";

class RetrieveGlucoseLogsController {
    static async retrieveGlucoseLogs(uid) {
        try {
            return await GlucoseLogs.fetchGlucoseLogsForInsight(uid)
        } catch(error) {
            throw new Error(error.message);
        }
    }
}

export default RetrieveGlucoseLogsController