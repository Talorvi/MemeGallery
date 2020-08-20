import Meme from '../../database/models/Meme.js';
import sequelize from 'sequelize';
const { Op } = sequelize;

export default async function getSounds(req, res) {
    let sounds = await Meme.findAll({where: {
        type: {
            [Op.eq]: '.mp3'
        }
    }});
    res.json({
        sounds: sounds
    });
}