import MedicineLogs from "../Entity/MedicineLogs";

class UpdateMedicineLogsController {
    static async updateMedicineLogs(uid, medicineData) {
        try{
            return await MedicineLogs.updateMedicineLogs(uid, medicineData)
        } catch(error) {
            throw new Error(error.message)
        }
    }
}

export default UpdateMedicineLogsController