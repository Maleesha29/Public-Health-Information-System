const express = require('express');
const routerVacApp = express.Router();
const VaccineAppController = require('./VAppController');

routerVacApp.post('/addVacApp' , VaccineAppController.addVacApp);
routerVacApp.get('/VacccinesApp' , VaccineAppController.getVacApp);
routerVacApp.post('/updateVacApp' , VaccineAppController.updateVacApp);
routerVacApp.post('/deleteVacApp' , VaccineAppController.deleteVacApp);

module.exports = routerVacApp;