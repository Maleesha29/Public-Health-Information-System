const express = require('express');
const routerDocM = express.Router();
const DocMController = require('./DocMController');
const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({ storage });

routerDocM.post('/addDocM' , upload.array("documents", 4), DocMController.addDocM);
routerDocM.get('/Documents' , DocMController.getDocM);
routerDocM.post('/updateDocM' , DocMController.updateDocM);
routerDocM.post('/deleteDocM' , DocMController.deleteDocM);

module.exports = routerDocM;