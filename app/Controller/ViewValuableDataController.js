import User from "../Entity/User";

class ViewValueableDataController {
    static async viewValuableData() {
        try {
            return await User.fetchTotalLogsCount()
        } catch (error) {

        }
    }
}

export default ViewValueableDataController