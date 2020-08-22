import JoinCommand from "./joinCommand.js"
import MemeCommand from "./memeCommand.js";
import SoundCommand from "./soundCommand.js";
import YtCommand from "./ytCommand.js";

export default class CommandWrapper {
    constructor(message) {
        this.message = message;

        if (this.message.content.includes('/meme') || this.message.content.includes('/m')) {
            new MemeCommand(this.message).run();
        }

        if (this.message.content.includes('/sound') || this.message.content.includes('/s')) {
            new SoundCommand(this.message).run();
        }

        if  (this.message.content.includes('/yt')) {
            new YtCommand(this.message).run();
        }
    }
}