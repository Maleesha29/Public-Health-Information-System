const express = require('express');
const routerRA = express.Router();
const Raids_staffcontroller = require('./AssignRaidsController');


routerRA.post('/addstaffraids', Raids_staffcontroller.addstaffraids);
routerRA.get('/getstaffraids', Raids_staffcontroller.getstaffraids);
routerRA.post('/updatestaffraids', Raids_staffcontroller.updatestaffdraids);
routerRA.post('/deletestaffraids', Raids_staffcontroller.deletestaffraids);

module.exports = routerRA;
