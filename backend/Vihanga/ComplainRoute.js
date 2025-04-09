const express = require('express');
const routerCmp = express.Router();
const ComplainController = require('./ComplainController');
const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({ storage });//saved to the local memory and can be accesed globaly

routerCmp.post('/addComplain', upload.array("images", 4), ComplainController.addComplain);
routerCmp.get('/Complain', ComplainController.getComplain);
routerCmp.post('/updateComplain', ComplainController.updateComplain);
routerCmp.post('/deleteComplain', ComplainController.deleteComplain);

module.exports = routerCmp;