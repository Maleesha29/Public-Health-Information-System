const mongoose = require('mongoose');

const AddRaidForm = new mongoose.Schema({
    location: String,
    date: String,
    time: String,
    officer: String,
    sNote: String
},
{
    collection : "RaidForm"
});

const RF = mongoose.model('RaidForm',AddRaidForm);
module.exports = RF;