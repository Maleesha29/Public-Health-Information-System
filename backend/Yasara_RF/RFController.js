const mongoose = require('mongoose');
const RF = require('./RFModel');
const { error } = require('console');

const addRForm = async(req,res) => {
    try{
        
            const{ location, date, time, officer, sNote} = req.body;

            const Date=Array.isArray(date)?date.join(', '):date;

            const newRForm =  new RF({

                location,
                date:Date,
                time,
                officer,
                sNote
            });

            await newRForm.save();
            res.json({ success : true , message : 'Raid Form added successfully'});
        }
    catch(error){
        console.error('Error adding Raid Form: ' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const getRForm = async (req,res) => {
    try{
        const allRF = await RF.find();
        res.json({allRF});
    }catch(error){
        console.error('Error getting Raid Form:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const updateRForm = async (req,res) => {

    try{

        const { _id, location, date, time, officer, sNote} = req.body;

        const updatedRF = await RF.findOneAndUpdate({_id} ,{
            _id,
            location,
            date,
            time,
            officer,
            sNote
        }, { new : true});

        if(!updatedRF){
            return res.status(404).json({ success : false, message :'Selected Raid form not found'});
        }

        res.json({ success : true, message : 'Raid form updated successfully' , data : updatedRF});
    }catch(error){
        console.error('Error updating Raid form:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const deleteRForm = async (req,res) => {
    try{
        const {_id} = req.body;

        const deletedRF = await RF.findOneAndDelete({_id});

        if(!deletedRF){
            return res.status(404).json({ success: false , message : 'Raid form not found'});
        }

        res.json({ success : true , message : 'Raid form deleted successfully' , data : deletedRF});
    }catch(error){
        console.error('Error deleting Raid form:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}
exports.addRForm = addRForm;
exports.getRForm = getRForm;
exports.updateRForm = updateRForm;
exports.deleteRForm = deleteRForm;