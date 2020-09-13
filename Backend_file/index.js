require('dotenv').config();
const Api = require('./app');
const DataBaseService = require('./database');

async function init() {
    try {
        await DataBaseService.DataBaseService.connect();
        await Api.Api.start();
    } catch (error) {
        console.log('Error: ', error);
        process.exit(1);
    }
}

init();
