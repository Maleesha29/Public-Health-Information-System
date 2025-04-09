const express = require('express');
const routerB = express.Router();
const BDetController = require('./BDetController');

routerB.post('/addBaby' , BDetController.addBaby);
routerB.get('/baby' , BDetController.getBaby);
routerB.post('/updateBaby' , BDetController.updateBaby);
routerB.post('/deleteBaby' , BDetController.deleteBaby);

module.exports = routerB;