import User from "../Entity/User"

class DeleteLogsController {
  static async deleteLogs(userId, logType, logId) {
    try {
      return await User.deleteLog(userId, logType, logId)
    } catch(error) {
      throw error
    }
  }
}

export default DeleteLogsController