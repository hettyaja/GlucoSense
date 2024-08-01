import User from "../Entity/User";

class ViewValueableDataController {
    static async viewValuableData() {
        try {
            return await User.fetchTotalLogsCount()
        } catch (error) {

        }
    }

    static async viewActiveUser() {
        try {
            return await User.fetchActiveUser()
        } catch (error) {
            throw new Error (error.message)
        }
    }

    static async viewActiveBP() {
        try {

        } catch (error) {
            
        }
    }

    static async viewPremiumUser() {
        try {

        } catch (error) {
            
        }
    }
    
    static async viewTotalBP() {
        try {

        } catch (error) {
            
        }
    }

    static async viewTotalUser() {
        try {

        } catch (error) {
            
        }
    }
}

export default ViewValueableDataController