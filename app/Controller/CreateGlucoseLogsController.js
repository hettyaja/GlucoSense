import GlucoseLogs from "../Entity/GlucoseLogs";

class CreateGlucoseLogsController {
    static async createGlucoseLogs(userId, glucoseData) {
        try {
            return await GlucoseLogs.createGlucoseLogs(userId, glucoseData)
        } catch(error) {
            throw new Error(error.message);
        }
    }
}

export default CreateGlucoseLogsController