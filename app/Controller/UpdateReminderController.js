import Reminder from "../Entity/Reminder";

class UpdateReminderController {
    static async updateReminder(uid, reminderData) {
        try {
            return await Reminder.updateReminder(uid, reminderData)
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

export default UpdateReminderController