const mongoose = require('mongoose');

const addstaffdengue = new mongoose.Schema({
    venue:String,      
    date:String,
    staffmember:String, 
    time:String,     
},
{
    collection : "Denguestaff"
});

const denguestaff = mongoose.model('Denguestaff',addstaffdengue);
module.exports = denguestaff;