import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import * as fs from "fs";
import http from 'http';
import https from 'https';

import Router from './router/index.js';
import Database from './database/index.js';
import Discord from "./discord/index.js";

const env = process.env.NODE_ENV || 'development';

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('assets'));
app.use(fileUpload({
    createParentPath: true
}));

initializeServer();

new Router(app);
const database = new Database();
const discord = new Discord();

function initializeServer() {
    const httpServer = http.createServer(app);

    if (env === 'development') {
        dotenv.config({ path: './.env.test' });
        console.log('Running on development');
    }
    else {
        dotenv.config();
        const privateKey = fs.readFileSync('/etc/letsencrypt/live/memegallery.polarlooptheory.pl/privkey.pem', 'utf8');
        const certificate = fs.readFileSync('/etc/letsencrypt/live/memegallery.polarlooptheory.pl/cert.pem', 'utf8');
        const ca = fs.readFileSync('/etc/letsencrypt/live/memegallery.polarlooptheory.pl/chain.pem', 'utf8');

        const credentials = {
            key: privateKey,
            cert: certificate,
            ca: ca
        };

        const httpsServer = https.createServer(credentials, app);

        const ssl_port = process.env.SSL_PORT || 80;

        httpsServer.listen(ssl_port, () => {
            console.log('HTTPS Server running on port 443');
        });

        console.log('Running on production');
    }

    const port = process.env.PORT || 80;

    httpServer.listen(port, () => {
        console.log('HTTP Server running on port 80');
    });
}