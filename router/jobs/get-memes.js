import Meme from '../../database/models/Meme.js';

export default async function getMemes(req, res) {
    let memes = await Meme.findAll();
    res.json({
        memes: memes
    });
}