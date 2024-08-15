import MedicineLogs from "../Entity/MedicineLogs"

class DeleteMedListController {
    static async deleteMedList(uid, medicine) {
        try {
            return await MedicineLogs.deleteMedList(uid, medicine)
        } catch(error) {
            throw error
        }
    }
}

export default DeleteMedListController