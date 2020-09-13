//require('dotenv').config();
const async = require('async');
const request = require('request');
const DataBaseService = require('../../database');

class MedicineService {
    getMedicineDetails(req) {
        return new Promise(async (resolve, reject) => {
            const err = new Error();
            try {

                async.parallel(this.getMedicinesList(req), async (asyncErr, results) => {
                    if (asyncErr) {
                        reject(asyncErr);
                    } else {

                        console.log('results::',results);
                        resolve(results);
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    getMedicinesList(req) {        
        const DB = DataBaseService.DataBaseService.getDB('medicine_data');
        const detailsCol = DB.collection('medicine_details');
        let searchName = {};
        if(req.query.name) {
            searchName.name = req.query.name;
        }

        return {
            medicines: (callback) => {
                detailsCol.find(searchName).toArray((err, result) => {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, result);
                    }
                });
            }
        };
    }
}

module.exports.MedicineService = MedicineService;