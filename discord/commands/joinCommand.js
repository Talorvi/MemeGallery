import Command from "./command.js"

export default class JoinCommand extends Command {
    async run() {
        if (this.message.member.voice.channel) {
            const connection = await this.message.member.voice.channel.join();
            const dispatcher = connection.play('./assets/sounds/run.mp3');
            dispatcher.setVolume(0.25);
            dispatcher.on('finish', () => {
                this.message.delete();
                connection.disconnect();
            });
        } else {
            await this.message.reply('Dołącz najpierw do kanału!');
        }
    }
}