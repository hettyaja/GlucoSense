import GlucoseLogs from "../Entity/GlucoseLogs";

class FetchA1cController {
    static async fetchA1C(userId) {
        try {
            return await GlucoseLogs.calculateA1C(userId)
        } catch(error) {
            throw new Error(error.message);
        }
    }
}

export default FetchA1cController