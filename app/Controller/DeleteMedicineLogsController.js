import MedicineLogs from "../Entity/MedicineLogs";

class DeleteMedicineLogsController {
    static async deleteMedicineLogs(uid, medicineLogsId) {
        try {
            return await MedicineLogs.deleteMedicineLogs(uid, medicineLogsId)
        } catch(error) {
            throw new Error(error.message)
        }
    }
}

export default DeleteMedicineLogsController