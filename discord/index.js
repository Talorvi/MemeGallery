import discord from "discord.js";
import ytdl from "ytdl-core";
import CommandWrapper from "./commands/commandWrapper.js"
import schedule from "node-schedule";
import statuses from "../assets/statuses.js";

export default class Discord {
    constructor() {
        this.init();
    }

    client = new discord.Client();

    init() {
        this.client.login(process.env.BOT_TOKEN).then();

        this.client.on('ready', () => {
            this.updatePresenceJob();
        });

        this.client.on('message', async message => {
            if (!message.guild) return;
            new CommandWrapper(message);
        });

        this.client.on('voiceStateUpdate', async (oldMember, newMember) => {
            if (newMember.member.user.bot) {
                return false;
            }

            await this.userJoinedEvent(oldMember, newMember);
            await this.userLeftEvent();
        });
    }

    setActivity(activity, status) {
        this.client.user.setPresence({activity: {name: activity}, status: status}).then();
     }

    async userJoinedEvent(oldMember, newMember) {
        if (!oldMember.channel && newMember.channel) {
            const connection = await newMember.channel.join();
            const dispatcher = connection.play(ytdl('https://youtu.be/saiDrx06-fI', { filter: 'audioonly' }));
            dispatcher.on('finish', () => {
                connection.disconnect();
            });
        }
    }

    async userLeftEvent(oldMember, newMember) {
        if (oldMember.channel && !newMember.channel) {
            //TODO: user left
        }
    }

    updatePresenceJob() {
        const random = Math.floor(Math.random() * statuses.length);
        this.setActivity(statuses[random], 'dnd');

        schedule.scheduleJob('*/1 * * * *', () => {
            const random = Math.floor(Math.random() * statuses.length);
            this.setActivity(statuses[random], 'dnd');
        });
    }
}