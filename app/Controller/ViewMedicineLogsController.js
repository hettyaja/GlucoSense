import MedicineLogs from "../Entity/MedicineLogs";

class ViewMedicineLogsController {
    static async viewMedicineLogs(uid) {
        try {
            return await MedicineLogs.fetchMedicineLogs(uid)
        } catch(error) {
            throw new Error(error.message);
        }
    }
}

export default ViewMedicineLogsController