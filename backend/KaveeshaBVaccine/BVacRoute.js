const express = require('express');
const routerBV = express.Router();
const BVacController = require('./BVacController');

routerBV.post('/addBabyVac' , BVacController.addBabyVac);
routerBV.get('/babyvacc' , BVacController.getBabyVac);
routerBV.post('/updateBabyVac' , BVacController.updateBabyVac);
routerBV.post('/deleteBabyVac' , BVacController.deleteBabyVac);

module.exports = routerBV;