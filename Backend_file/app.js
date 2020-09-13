require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ConfigureRoutes = require('./routes/routes');
const Server = require('http');

class Api {
    static start() {

        const app = express();
        const apiPort = process.env.APIPORT;
        const corsObj = {
            'origin': '*',
            'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
            'preflightContinue': false,
            'optionsSuccessStatus': 204,
            'allowedHeaders': ['Content-Type', 'Authorization', 'app-context', 'app-subcontext', 'Roles'],
            'credentials': true
        };
        // Remove the x-powered-by headers.
        app.disable('x-powered-by');
        app.use((req, res, next) => {
            res.removeHeader('x-powered-by');
            next();
        });
        app.use(cors(corsObj));
        app.use(function (req, res, next) {
            res.setHeader('Content-Security-Policy', 'script-src \'self\' https://apis.google.com');
            return next();
        });
        app.use(bodyParser.json());
        app.use(process.env.APIBASEURL, ConfigureRoutes.configure());
        return new Promise((resolve, reject) => {
            const server = app.listen(process.env.APIPORT, () => {
                console.log('Express server running on port ' + apiPort);
                resolve(server);
            });
        });
    }
}

module.exports.Api = Api;
