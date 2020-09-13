const MongoClient = require('mongodb');
let connectionDBObj;

class DataBaseService {

    static async connect(uri) {
        const mongoConnectionString = uri || process.env.DB_link;
        console.log(mongoConnectionString)
        this.connectionDBObj = await MongoClient.connect(mongoConnectionString, { useNewUrlParser: true });
    };

    static async close() {
        await this.connectionDBObj.close(true);
    }

    static getDB(dbName) {
        return this.connectionDBObj.db(dbName);
    }
}

module.exports.DataBaseService = DataBaseService;
