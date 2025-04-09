const express = require('express');
const routerST = express.Router();
const Leavecontroller = require('./LeaveController');

routerST.post('/addLeave' , Leavecontroller.addLeave);
routerST.get('/Leave' , Leavecontroller.getLeave);
routerST.post('/updateLeave' , Leavecontroller.updateLeave);
routerST.post('/deleteLeave' , Leavecontroller.deleteLeave);

module.exports = routerST;