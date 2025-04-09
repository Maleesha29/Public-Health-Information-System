const mongoose = require('mongoose');

const AddRaidSub = new mongoose.Schema({

    vname: String,
    vemail: String,
    vcno: Number,
    vnic: String,
    vtype: String,
    location: String,
    details: String,
    specialNotes: String,
},
    {
        collection: "RaidSubmission"
    });

const RS = mongoose.model('RaidSubmission', AddRaidSub);
module.exports = RS;

