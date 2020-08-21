import JoinCommand from "./joinCommand.js"
import MemeCommand from "./memeCommand.js";
import SoundCommand from "./soundCommand.js";
import YtCommand from "./ytCommand.js";

export default class CommandWrapper {
    constructor(message) {
        this.message = message;

        if (this.message.content === '/join') {
            new JoinCommand(this.message).run();
        }

        if (this.message.content.includes('/meme')) {
            new MemeCommand(this.message).run();
        }

        if (this.message.content.includes('/sound')) {
            new SoundCommand(this.message).run();
        }

        if  (this.message.content.includes('/yt')) {
            new YtCommand(this.message).run();
        }
    }
}