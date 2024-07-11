import Reminder from "../Entity/Reminder";

class DeleteReminderController {
    static async deleteReminder(uid, reminderId) {
        try {
            return await Reminder.deleteReminder(uid, reminderId)
        } catch(error) {
            throw new Error(error.message)
        }
    }
}

export default DeleteReminderController