const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    filename: String,
    data: String,
    contentType: String,
    image: Buffer,
});

const AddComplain = new mongoose.Schema({

    fname: String,
    lname: String,
    mobile: Number,
    email: String,
    NIC: String,
    yaddress: String,
    ctype: String,
    cdesc: String,
    date: String,
    images: [imageSchema],
    area: String,
    //location: String
},
    {
        collection: "Complains"
    });

const Complains = mongoose.model('Complains', AddComplain);
module.exports = Complains;