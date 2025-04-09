const express = require('express');
const routerRS = express.Router();
const RSController = require('./RSController');

routerRS.post('/addRS' , RSController.addRSub);
routerRS.get('/raidSub' , RSController.getRSub);
routerRS.post('/updateRS' , RSController.updateRSub);
routerRS.post('/deleteRS' , RSController.deleteRSub);

module.exports = routerRS;