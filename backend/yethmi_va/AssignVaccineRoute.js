const express = require('express');
const routerVS = express.Router();
const Vaccine_staffcontroller = require('./AssignVaccineController');

routerVS.post('/addstaffvaccine', Vaccine_staffcontroller.addstaffvaccine);
routerVS.get('/getstaffvaccine', Vaccine_staffcontroller.getstaffvaccine);
routerVS.post('/updatestaffvaccine', Vaccine_staffcontroller.updatestaffvaccine);
routerVS.post('/deletestaffvaccine', Vaccine_staffcontroller.deletestaffvaccine);

module.exports = routerVS;
