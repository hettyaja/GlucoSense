import GlucoseLogs from "../Entity/GlucoseLogs";

class DeleteGlucoseLogsController {
    static async deleteGlucoseLogs(uid, glucoseLogsId) {
        try {
            return await GlucoseLogs.deleteGlucoseLogs(uid, glucoseLogsId)
        } catch(error) {
            throw new Error(error.message);
        }
        
    }
}

export default DeleteGlucoseLogsController