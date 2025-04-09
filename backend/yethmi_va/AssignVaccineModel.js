const mongoose = require('mongoose');

const addstaffvaccineSchema = new mongoose.Schema({
            v_name:String,        
            quantity:String,
            date:String,   
            location:String,
            staffmember:String
}, {
    collection: "Vaccinestaff"
});

const Vaccinestaff = mongoose.model('Vaccinestaff', addstaffvaccineSchema);
module.exports = Vaccinestaff;
