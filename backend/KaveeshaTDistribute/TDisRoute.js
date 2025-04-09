const express = require('express');
const routerTD = express.Router();
const TDisController = require('./TDisController');

routerTD.post('/addTDis' , TDisController.addTDis);
routerTD.get('/Triposha' , TDisController.getTDis);
routerTD.post('/updateTDis' , TDisController.updateTDis);
routerTD.post('/deleteTDis' , TDisController.deleteTDis);

module.exports = routerTD;