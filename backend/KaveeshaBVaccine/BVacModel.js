const mongoose = require('mongoose');

const AddBVac = new mongoose.Schema({
    type : String,
    esti_Date : String,
    quantity: Number,
},
{
    collection : "BVac"
});

const BVaccine = mongoose.model('BVac',AddBVac);
module.exports = BVaccine;