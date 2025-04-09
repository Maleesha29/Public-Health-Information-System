const mongoose = require('mongoose');

const addraidofficer = new mongoose.Schema({
    Name: String,
    Type: String,
    Address: String,
    officer: String,
    compID: String,
    Specialnotes:String,
    DateTime:String
},
    {
        collection: "RaidOfficer"
    });

const raidofficer = mongoose.model('RaidOfficer', addraidofficer);
module.exports = raidofficer;