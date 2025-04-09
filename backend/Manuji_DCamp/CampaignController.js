const mongoose = require('mongoose');
const Campaigns = require('./CampaignModel');
const { error } = require('console');

const addCampaign = async(req,res) => {
    try{
        
            const{ venue , date , time , etime, drName} = req.body;

            const formatteddate = Array.isArray(date) ? date.join(', ') : date;
            const newCampaign =  new Campaigns({
                venue,      
                date : formatteddate,
                time,
                etime,
                drName          
            });

            await newCampaign.save();
            res.json({ success : true , message : 'Dengue Campaign added successfully'});
        }
    catch(error){
        console.error('Error adding Dengue Campaign: ' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const getCampaign = async (req,res) => {
    try{
        const allCampaign = await Campaigns.find();
        res.json({allCampaign});
    }catch(error){
        console.error('Error getting Campaign:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const updateCampaign = async (req,res) => {

    try{

        const { _id, venue , date , time , etime, drName} = req.body;

        const updatedCampaign = await Campaigns.findOneAndUpdate({_id} ,{
        
            venue,
            date,
            time,
            etime,
            drName
        }, { new : true});

        if(!updatedCampaign){
            return res.status(404).json({ success : false, message :'Selected dengue Campaign not found'});
        }

        res.json({ success : true, message : 'Dengue Campaign updated successfully' , data : updatedCampaign});
    }catch(error){
        console.error('Error updating campaign:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const deleteCampaign = async (req,res) => {
    try{
        const {_id} = req.body;

        const deletedCampaign = await Campaigns.findOneAndDelete({_id});

        if(!deletedCampaign){
            return res.status(404).json({ success: false , message : 'Campaign not found'});
        }

        res.json({ success : true , message : 'Campaign deleted successfully' , data : deletedCampaign});
    }catch(error){
        console.error('Error deleting Campaign:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}
exports.addCampaign = addCampaign;
exports.getCampaign = getCampaign;
exports.updateCampaign = updateCampaign;
exports.deleteCampaign = deleteCampaign;