import GlucoseLogs from "../Entity/GlucoseLogs";

class UpdateGlucoseLogsController {
    static async updateGlucoseLogs(userId, glucoseData) {
        try {
            return await GlucoseLogs.updateGlucoseLogs(userId, glucoseData)
        } catch(error) {
            throw new Error(error.message);
        }
    }
}

export default UpdateGlucoseLogsController