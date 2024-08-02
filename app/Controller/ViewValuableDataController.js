import BusinessPartner from "../Entity/BusinessPartner";
import User from "../Entity/User";

class ViewValueableDataController {
    static async viewValuableData() {
        try {
            return await User.fetchTotalLogsCount()
        } catch (error) {
            throw error
        }
    }

    static async viewTotalUser() {
        try {
            return await User.fetchTotalUsers()
        } catch (error) {
            throw error
        }
    }

    static async viewActiveUser() {
        try {
            return await User.fetchActiveUser()
        } catch (error) {
            throw new Error (error.message)
        }
    }
    
    static async viewPremiumUser() {
        try {
            return await User.fetchPremiumUser()
        } catch (error) {
            throw error
        }
    }

    static async viewTotalPartnership() {
        try {
            return await BusinessPartner.fetchTotalPartnership()
        } catch (error) {
            throw error
        }
    }

    static async viewActivePartnership() {
        try {
            return await BusinessPartner.fetchActivePartnership()
        } catch (error) {
            throw error
        }
    }

    static async viewPendingPartnership() {
        try {
            return await BusinessPartner.fetchPendingPartnership()
        } catch (error) {
            throw error
        }
    }
}

export default ViewValueableDataController