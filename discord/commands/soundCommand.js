import Command from "./command.js"
import Meme from "../../database/models/Meme.js";
import sequelize from 'sequelize';
import Helper from "../helpers/index.js";
const { Op } = sequelize;

export default class SoundCommand extends Command {
    async run() {
        const regexp = new RegExp(/sound (.*)/);
        const soundName = this.message.content.match(regexp);
        const sound = await Meme.findOne({where: {name: soundName[1], type: {[Op.eq]: '.mp3'}}});
        if (sound) {
            await Helper.playSound(this.message.member.voice.channel, sound.file);
            await this.message.delete();
        } else {
            await this.message.reply('nie znalazłem takiego dźwięku 👁👄👁');
        }
    }
}