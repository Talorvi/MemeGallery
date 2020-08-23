import Command from "./command.js"
import sequelize from 'sequelize';
import Helper from "../helpers/index.js";

export default class YtCommand extends Command {
    async run() {
        if (this.message.member.voice.channel) {
            const regexp = new RegExp(/yt (.*)/);
            const link = this.message.content.match(regexp);

            await Helper.getYoutubeLink(link[1]);

            if (link) {
                const properLink = await Helper.getYoutubeLink(link[1]);
                await Helper.playYouTube(this.message.member.voice.channel, properLink).then(() => {
                    this.message.delete();
                }).catch(error => {
                    this.message.reply('nie znalazłem takiego filmiku 👁👄👁');
                });
                await this.message.delete();
            } else {
                await this.message.reply('nie znalazłem takiego filmiku 👁👄👁');
            }
        } else {
            await this.message.reply('dołącz najpierw do kanału!');
            await this.message.delete();
        }
    }
}