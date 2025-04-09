const express = require('express');
const routerDS = express.Router();
const Dengue_staffcontroller = require('./AssignDengueController');

routerDS.post('/addstaffdengue' , Dengue_staffcontroller.addstaffdengue);
routerDS.get('/getstaffdengue' , Dengue_staffcontroller.getstaffdengue);
routerDS.post('/updatestaffdengue' , Dengue_staffcontroller.updatestaffdengue);
routerDS.post('/deletestaffdengue' , Dengue_staffcontroller.deletestaffdengue);

module.exports = routerDS;