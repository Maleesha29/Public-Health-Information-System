const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: String,
    data: String,
    contentType: String,
    file: Buffer,
});

const AddDocM = new mongoose.Schema({
    r_id : String, 
    ro_name : String,
    date : String,
    v_name : String,
    v_type : String,
    documents : [fileSchema],
},
{
    collection : "DocumentM"
});

const DocM = mongoose.model('DocumentM',AddDocM);
module.exports = DocM;