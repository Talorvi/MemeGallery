import Meme from '../../database/models/Meme.js';
import sequelize from 'sequelize';
const { Op } = sequelize;

export default async function getMemes(req, res) {
    let memes = await Meme.findAll({where: {
        type: {
            [Op.ne]: '.mp3',
        }
    }});
    res.json({
        memes: memes
    });
}