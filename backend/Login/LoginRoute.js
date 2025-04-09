const express = require('express');
const routerL = express.Router();
const loginControlller = require('./LoginController');
const checkingControlller = require('./CheckingController');

routerL.post('/addLogin' , loginControlller.addLogin);
routerL.post('/checkLogin' , checkingControlller.checkLogin);


module.exports = routerL;