import Command from "./command.js"
import sequelize from 'sequelize';
import Helper from "../helpers/index.js";

export default class YtCommand extends Command {
    async run() {
        const regexp = new RegExp(/yt (.*)/);
        const link = this.message.content.match(regexp);
        if (link) {
            await Helper.playYouTube(this.message.member.voice.channel, link[0]).then(() => {
                this.message.delete();
            }).catch(error => {
                this.message.reply('nie znalazłem takiego filmiku 👁👄👁');
            });
            await this.message.delete();
        } else {
            await this.message.reply('nie znalazłem takiego filmiku 👁👄👁');
        }
    }
}