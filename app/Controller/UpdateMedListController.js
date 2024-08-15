import MedicineLogs from "../Entity/MedicineLogs";

class UpdateMedicineListController {
    static async updateMedicineList(uid, medicineData) {
        try{
            return await MedicineLogs.updateMedicineList(uid, medicineData)
        } catch(error) {
            throw new Error(error.message)
        }
    }
}

export default UpdateMedicineListController