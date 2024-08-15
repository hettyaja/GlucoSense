import MedicineLogs from "../Entity/MedicineLogs";

class ViewMedListController {
    static async viewMedicineList(uid) {
        try {
            return await MedicineLogs.getMedicine(uid)
        } catch(error) {
            throw new Error(error.message);
        }
    }
}

export default ViewMedListController