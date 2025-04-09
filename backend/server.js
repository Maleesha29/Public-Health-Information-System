const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const routerDC = require('./Manuji_DCamp/CampaignRoute');
const routerCmp = require('./Vihanga/ComplainRoute');
const routerRF = require('./Yasara_RF/RFRoute');
const routerRS = require('./Yasara_RS/RSRoute');
const routerB = require('./KaveeshaBDetails/BDetRoute');
const routerBV = require('./KaveeshaBVaccine/BVacRoute');
const routerTD = require('./KaveeshaTDistribute/TDisRoute');
const routerST = require('./Yethmi/LeaveRoute');
const routerVac = require('./HimaaVReg/VRegRoute');
const routerVacRq = require('./HimaaaVacReq/VReqRoute');
const routerVacApp = require('./HimaaAppointment/VAppRoute');
const routerClnc = require('./Vanuja_Clinic/ClinicRoute');
const routerVReport = require('./Maleesha_RViolation/RVRoute');
const routerDocM = require('./Maleesha_DocM/DocMRoute');
const routerP = require('./Vanuja_AddPatient/AddPRoute');
const routerDS = require('./Yethmi/AssignDengueRoute');
const routerVS = require('./Yethmi_va/AssignVaccineRoute');
const routerL = require('./Login/LoginRoute');
const routerRA = require('./Yethmi_rad/AssignRaidsRoute');
const routerRO = require('./Yasara_Raidofficer/RaidofficerRoute');

dotenv.config();

//rest
const app = express();

const uri = 'mongodb+srv://vanuja2024:7289@phisystem.r1glzmh.mongodb.net/';

const connect = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to mongodb');
    } catch (error) {
        console.log('Mongodb error: ', error);
    }
};

connect();

app.use(cors());

app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to PHI Backend'
    });
});

app.use(express.json());

//port
const PORT = process.env.PORT || 4000;

//run
app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`);
});


app.use('/api', routerDC);
app.use('/api', routerCmp);
app.use('/api', routerRF);
app.use('/api', routerRS);
app.use('/api', routerB);
app.use('/api', routerBV);
app.use('/api', routerTD);
app.use('/api', routerST);
app.use('/api', routerVac);
app.use('/api', routerVacRq);
app.use('/api', routerVacApp);
app.use('/api', routerClnc);
app.use('/api', routerVReport);
app.use('/api', routerDocM);
app.use('/api', routerP);
app.use('/api', routerDS);
app.use('/api', routerL);

app.use('/api', routerDC);
app.use('/api', routerCmp);
app.use('/api', routerRF);
app.use('/api', routerRS);
app.use('/api', routerB);
app.use('/api', routerBV);
app.use('/api', routerTD);
app.use('/api', routerST);
app.use('/api', routerVac);
app.use('/api', routerVacRq);
app.use('/api', routerVacApp);
app.use('/api', routerClnc);
app.use('/api', routerVReport);
app.use('/api', routerDocM);
app.use('/api', routerP);
app.use('/api', routerDS);
app.use('/api', routerVS);
app.use('/api', routerL);
app.use('/api', routerRA);
app.use('/api', routerRO); 