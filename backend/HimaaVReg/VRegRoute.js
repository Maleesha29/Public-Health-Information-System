const express = require('express');
const routerVac = express.Router();
const VaccineController = require('./VRegController');

routerVac.post('/addVac' , VaccineController.addVac);
routerVac.get('/Vacccines' , VaccineController.getVac);
routerVac.post('/updateVac' , VaccineController.updateVac);
routerVac.post('/deleteVac' , VaccineController.deleteVac);

module.exports = routerVac;