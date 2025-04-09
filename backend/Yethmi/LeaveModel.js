const mongoose = require('mongoose');

const AddLeave = new mongoose.Schema({
    name : String,
    staffid:String,
    email : String,
    position:String,
    doleave:String,
    leavestrt : String,
    leaveend : String,
    leaveType: String
},
{
    collection : "Leave"
});

const Leave = mongoose.model('Leave',AddLeave);
module.exports = Leave;