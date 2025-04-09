const express = require('express');
const routerVacRq = express.Router();
const VaccineRqController = require('./VReqController');

routerVacRq.post('/addVacRq' , VaccineRqController.addVacRq);
routerVacRq.get('/VacccinesReq' , VaccineRqController.getVacRq);
routerVacRq.post('/updateVacRq' , VaccineRqController.updateVacRq);
routerVacRq.post('/deleteVacRq' , VaccineRqController.deleteVacRq);

module.exports = routerVacRq;