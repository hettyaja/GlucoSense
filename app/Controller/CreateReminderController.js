import Reminder from "../Entity/Reminder";

class CreateReminderController {
    static async createReminder(uid, reminderData) {
        try {
            return await Reminder.createReminder(uid, reminderData)
        } catch(error) {
            throw new Error(error.message)
        }
    }
}

export default CreateReminderController