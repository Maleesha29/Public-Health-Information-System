const mongoose = require('mongoose');

const AddClinic = new mongoose.Schema({
    ctype: String,
    date: String,
    uname: String,
    venue: String
},
    {
        collection: "Clinics"
    });

const Clinics = mongoose.model('Clinics', AddClinic);
module.exports = Clinics;