export default class Talk {
    #talk;
    constructor(talk) {
        this.#talk = talk;
    }
    get reminderMailContent() {
        return "<<reminder mail content>>";
    }
    get reminderMailSubject() {
        return `<<subject - reminder>>`;
    }
    shouldSendReminderMail() {
        return true;
    }
    get presenterMailAdress() {
        if (typeof this.#talk.presenter_mail === 'string') {
            return this.#talk.presenter_mail;
        }
        throw new Error('recipient mail adress is invalid');
    }
    get notificationMailContent() {
        return "<<notification mail content>>";
    }
    get notificationMailSubject() {
        return `<<subject - notification>>`;
    }
    shouldSendNotificationMail() {
        return true;
    }
};