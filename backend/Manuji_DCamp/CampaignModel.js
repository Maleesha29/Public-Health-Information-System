const mongoose = require('mongoose');

const AddCampaign = new mongoose.Schema({
    venue : String,
    date : String,
    time : String,
    etime : String,
    drName : String

},
{
    collection : "Campaign"
});

const Campaigns = mongoose.model('Campaign',AddCampaign);
module.exports = Campaigns;