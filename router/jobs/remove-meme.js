import Meme from '../../database/models/Meme.js';
import fs from 'fs';

export default async function removeMeme(req, res) {
    let meme = await Meme.findOne({where: {
        id: req.query.id
    }});
    await fs.unlink('assets/memes/' + meme.file, async (error) => {
        if (error) throw error;
        await meme.destroy();
    });
    res.json({
        message: "Mem usunięty"
    });
}