import BusinessPartner from '../Entity/BusinessPartner'

class DeleteBPController {
    static async deleteBP(uid) {
        try {
            return await BusinessPartner.deleteBP(uid)
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default DeleteBPController;