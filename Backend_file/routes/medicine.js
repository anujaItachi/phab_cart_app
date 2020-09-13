const express = require('express');
const {MedicineService} = require('../services/medicine/medicines');
//const ErrorHandler = require('../errors/error-handler');

class Medicines {
    static configureMedicineResult(){
        const router = express.Router();
        router.get('', async (req, res, next) => {
            const medicine = new MedicineService();
            try {
                const result = await medicine.getMedicineDetails(req);
                res.json(result);
            } catch (error) {
                console.log('Medicine / error: ', error);

                const custom_error = ErrorHandler.getCustomError('Medicine', error.name);
                res.status(custom_error.status_code).json(custom_error.data);
            }
        });
        return router;
    }
}

module.exports.Medicines = Medicines;