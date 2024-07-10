import Reminder from "../Entity/Reminder";

class ViewReminderController {
    static async viewReminder(uid) {
        try {
            return await Reminder.fetchReminder(uid)
        } catch(error) {
            throw new Error(error.message)
        }
    }
    
}

export default ViewReminderController