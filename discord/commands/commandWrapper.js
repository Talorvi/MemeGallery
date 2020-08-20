import JoinCommand from "./joinCommand.js"

export default class CommandWrapper {
    constructor(message) {
        this.message = message;

        if (this.message.content === '/join') {
            new JoinCommand(this.message).run();
        }
    }
}