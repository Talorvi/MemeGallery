import Command from "./command.js"
import Meme from "../../database/models/Meme.js";
import { MessageAttachment } from "discord.js";
import sequelize from 'sequelize';
const { Op } = sequelize;

export default class MemeCommand extends Command {
    async run() {
        const regexp = new RegExp(/(m|meme) (.*)/);
        const imageName = this.message.content.match(regexp);
        const meme = await Meme.findOne({where: {name: imageName[2], type: {[Op.ne]: '.mp3'}}});
        if (meme) {
            const attachment = new MessageAttachment('./assets/memes/' + meme.file);
            await this.message.channel.send(null, attachment);
            await this.message.delete();
        } else {
            await this.message.reply('nie znalazłem takiego mema 👁👄👁');
        }
    }
}