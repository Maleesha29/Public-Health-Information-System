const express = require('express');
const routerRO = express.Router();
const Assign_RaidofficerController = require('./RaidofficerController');

routerRO.post('/addraidofficer', Assign_RaidofficerController.addraidofficer);
routerRO.get('/getraidofficer', Assign_RaidofficerController.getraidofficer);
routerRO.post('/deleteraidofficer', Assign_RaidofficerController.deleteraidofficer);

module.exports = routerRO;
