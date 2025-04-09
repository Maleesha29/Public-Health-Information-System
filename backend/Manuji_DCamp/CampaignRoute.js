const express = require('express');
const routerDC = express.Router();
const CampaignController = require('./CampaignController');

routerDC.post('/addCamp' , CampaignController.addCampaign);
routerDC.get('/camp' , CampaignController.getCampaign);
routerDC.post('/updateCamp' , CampaignController.updateCampaign);
routerDC.post('/deleteCamp' , CampaignController.deleteCampaign);

module.exports = routerDC;