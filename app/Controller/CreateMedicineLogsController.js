import MedicineLogs from "../Entity/MedicineLogs"


class CreateMedicineLogsController {
    static async createMedicineLogs(uid, medicineData) {
        try {
            return await MedicineLogs.createMedicineLogs(uid, medicineData)
        } catch(error) {
            throw new Error(error.message)
        }
    }
}

export default CreateMedicineLogsController