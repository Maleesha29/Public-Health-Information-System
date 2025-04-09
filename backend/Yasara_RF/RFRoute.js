const express = require('express');
const routerRF = express.Router();
const RFController = require('./RFController');

routerRF.post('/addRF' , RFController.addRForm);
routerRF.get('/raidForm' , RFController.getRForm);
routerRF.post('/updateRF' , RFController.updateRForm);
routerRF.post('/deleteRF' , RFController.deleteRForm);

module.exports = routerRF;