const mongoose = require('mongoose');

const AddPatient = new mongoose.Schema({
    name : String,
    sex : String,
    age : Number,
    address : String,
    mobile : Number,
    clinicID : String
},
{
    collection : "Patients"
});

const Patients = mongoose.model('Patients',AddPatient);
module.exports = Patients;