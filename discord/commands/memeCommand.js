import Command from "./command.js"
import Meme from "../../database/models/Meme.js";
import { MessageAttachment } from "discord.js";

export default class MemeCommand extends Command {
    async run() {
        const regexp = new RegExp(/meme (.*)/);
        const imageName = this.message.content.match(regexp);
        console.log(imageName[1]);
        const meme = await Meme.findOne({where: {name: imageName[1]}});
        const attachment = new MessageAttachment('./assets/memes/' + meme.file);
        await this.message.channel.send(null, attachment);
        await this.message.delete();
    }
}