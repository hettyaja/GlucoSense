import MedicineLogs from "../Entity/MedicineLogs"

class GetMedicineByNameController {
  static async getMedicineByName (userId, name) {
    try {
      return await MedicineLogs.getMedicineByName(userId, name)
    } catch(error) {
      throw error
    }
  }
}

export default GetMedicineByNameController