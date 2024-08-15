import MedicineLogs from "../Entity/MedicineLogs"


class CreateMedListController {
    static async createMedsList(uid, medSaved) {
        try {
            return await MedicineLogs.createMedList(uid, medSaved)
        } catch(error) {
            throw new Error(error.message)
        }
    }
}

export default CreateMedListController
