import { v4 as uuidv4 } from 'uuid';
import Meme from "../../database/models/Meme.js"

export default async function upload(req, res) {
    try {
        if (!req.query.name) {
            res.status(500).send({ message: "No name given" });
        }
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let avatar = req.files.avatar;
            const uuid = uuidv4();

            if (getExtension(avatar.name) === "mp3") {
                console.log("plik mp3");
            }

            const meme = Meme.build({name: req.query.name, file: uuid + getExtension(avatar.name), type: getExtension(avatar.name)});
            try {
                await meme.save();
                avatar.mv('./assets/memes/' + uuid + getExtension(avatar.name));
                res.send({
                    status: true,
                    message: 'File is uploaded',
                    data: {
                        name: avatar.name,
                        mimetype: avatar.mimetype,
                        size: avatar.size
                    }
                });
            }
            catch (error) {
                await meme.destroy();
                res.status(500).send(error);
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

function getExtension(filename) {
    var i = filename.lastIndexOf('.');
    return (i < 0) ? '' : filename.substr(i);
}