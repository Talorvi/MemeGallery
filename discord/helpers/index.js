import ytdl from "ytdl-core";

export default class Helper {
    static constructor() {

    }

    static async playSound(channel, sound) {
        const connection = await channel.join();
        const dispatcher = connection.play('./assets/memes/' + sound);
        dispatcher.on('finish', () => {
            connection.disconnect();
        });
    }

    static async playYouTube(channel, link) {
        const connection = await channel.join();
        try {
            const dispatcher = connection.play(ytdl(link, {filter: 'audioonly'}));
            dispatcher.on('finish', () => {
                connection.disconnect();
            });
        }
        catch (error) {
            connection.disconnect();
            throw "Brak filmiku";
        }
    }
}