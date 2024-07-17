import GlucoseLogs from "../Entity/GlucoseLogs";

class RetrieveGlucoseLogsController {
    static async retriveGlucoseLogs(uid) {
        try {
            return await GlucoseLogs.fetchGlucoseLogsForGraph(uid)
        } catch(error) {
            throw new Error(error.message);
        }
    }
}

export default RetrieveGlucoseLogsController