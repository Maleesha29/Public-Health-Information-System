const mongoose = require('mongoose');

const AddReqVac = new mongoose.Schema({
    type : String, 
    quantity: Number,
    esti_Date:String,
    notification:String,
},
{
    collection : "VaccineReq"
});

const VaccineRq = mongoose.model('VaccineReq',AddReqVac);
module.exports = VaccineRq;