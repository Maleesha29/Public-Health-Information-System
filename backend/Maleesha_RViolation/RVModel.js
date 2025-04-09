const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    filename: String,
    data: String,
    contentType: String,
    image: Buffer,
});

const AddReportVio = new mongoose.Schema({
    ro_name : String, 
    ro_email : String,
    ro_mobile : String,
    date : String,
    v_location : String,
    v_type : String,
    v_description : String,
    v_name : String ,
    v_email : String,
    v_mobile : String,    
    evidence : [imageSchema],
    v_nic : String,
    decision: { type: String, default: 'Pending' },
},
{
    collection : "ViolationReport"
});

const VioReport = mongoose.model('ViolationReport',AddReportVio);
module.exports = VioReport;