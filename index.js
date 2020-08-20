import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";

import Router from './router/index.js';
import Database from './database/index.js';
import Discord from "./discord/index.js";

dotenv.config();
const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('assets'));

app.use(fileUpload({
    createParentPath: true
}));

new Router(app);
const database = new Database();
const discord = new Discord();

const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
