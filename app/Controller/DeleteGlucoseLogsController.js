import GlucoseLogs from "../Entity/GlucoseLogs";

class DeleteGlucoseLogsController {
    static async deleteGlucoseLogs(uid, glucoseLogsId) {
        return await GlucoseLogs.deleteGlucoseLogs(uid, glucoseLogsId)
    }
}

export default DeleteGlucoseLogsController