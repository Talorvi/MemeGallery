import upload from './jobs/upload.js'
import getMemes from "./jobs/get-memes.js";
import removeMeme from "./jobs/remove-meme.js";
import getSounds from "./jobs/get-sounds.js";

export default class Router {
    constructor(app) {
        this.app = app;
        this.init();
    }

    init() {
        this.app.get('/', (req, res) => {
            res.json({
                message: 'Behold The MEVN Stack!'
            });
        });

        this.app.post('/upload', async (req, res) => {
            await upload(req, res);
        });

        this.app.get('/get-memes', async (req, res) => {
            await getMemes(req, res);
        });

        this.app.post('/remove-meme', async (req, res) => {
            await removeMeme(req, res);
        })

        this.app.get('/get-sounds', async (req, res) => {
            await getSounds(req, res);
        });
    }
}