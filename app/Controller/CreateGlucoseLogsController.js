import GlucoseLogs from "../Entity/GlucoseLogs";

class CreateGlucoseLogsController {
    static async createGlucoseLogs(userId, glucoseData, isFromBluetooth = false) {
        try {
            return await GlucoseLogs.createGlucoseLogs(userId, glucoseData, isFromBluetooth);
        } catch(error) {
            throw new Error(error.message);
        }
    }
}

export default CreateGlucoseLogsController;