const Medicines = require('./medicine');
const express = require('express');

class ConfigureRoutes {
    static configure(){
        const router = express.Router();
        router.use('/medicineInfo', Medicines.Medicines.configureMedicineResult());
        return router;
    }
}

module.exports = ConfigureRoutes;