const express = require('express');
const routerVReport = express.Router();
const VioReportController = require('./RVController');
const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({ storage });

routerVReport.post('/addVioR' , upload.array("images", 4), VioReportController.addVioReport);
routerVReport.get('/VioReports' , VioReportController.getVioReport);
routerVReport.post('/updateVioR' , VioReportController.updateVioReport);
routerVReport.post('/deleteVioR' , VioReportController.deleteVioReport);

module.exports = routerVReport;