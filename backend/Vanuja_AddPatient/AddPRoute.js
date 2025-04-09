const express = require('express');
const routerP = express.Router();
const PatientController = require('./AddPController');

routerP.post('/addPatients' , PatientController.addPatients);
routerP.get('/Patients' , PatientController.getPatients);
routerP.post('/updatePatients' , PatientController.updatePatients);
routerP.post('/deletePatients' , PatientController.deletePatients);

module.exports = routerP;