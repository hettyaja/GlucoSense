import GlucoseLogs from "../Entity/GlucoseLogs";

class ViewGlucoseLogsController {
    static async viewGlucoseLogs(uid) {
        try {
            return await GlucoseLogs.fetchGlucoseLogs(uid)
        } catch(error) {
            throw new Error(error.message);
        }
    }
}

export default ViewGlucoseLogsController;