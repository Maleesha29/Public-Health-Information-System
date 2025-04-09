
const mongoose = require('mongoose');

const addstaffraids = new mongoose.Schema({
    type: String,
    staffmember: String,
    date: String,
    location: String,
    description: String
},
{
    collection : "Raidstaff" 
});

const raidstaff = mongoose.model('Raidstaff', addstaffraids);
module.exports = raidstaff;
