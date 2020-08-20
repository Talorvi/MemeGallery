import JoinCommand from "./joinCommand.js"
import MemeCommand from "./memeCommand.js";

export default class CommandWrapper {
    constructor(message) {
        this.message = message;

        if (this.message.content === '/join') {
            new JoinCommand(this.message).run();
        }

        if (this.message.content.includes('/meme')) {
            new MemeCommand(this.message).run();
        }
    }
}