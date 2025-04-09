const mongoose = require('mongoose');
const Baby = require('./BDetModel');
const { error } = require('console');

const addBaby = async(req,res) => {
    try{
        
            const{ bname, age, weight, co_no, notes,BDate,Gname} = req.body;
            const newBaby =  new Baby({
                bname,      
                age,
                weight,
                co_no,
                notes,
                BDate, 
                Gname        
            });

            await newBaby.save();
            res.json({ success : true , message : 'Baby details added successfully'});
        }
    catch(error){
        console.error('Error adding Baby details: ' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const getBaby = async (req,res) => {
    try{
        const allBabies = await Baby.find();
        res.json({allBabies});
    }catch(error){
        console.error('Error getting Baby details:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const updateBaby = async (req,res) => {

    try{

        const { _id, bname, age, weight, co_no, notes,BDate,Gname} = req.body;

        const updatedBaby = await Baby.findOneAndUpdate({_id} ,{
            _id,
            bname,      
            age,
            weight,
            co_no,
            notes,  
            BDate, 
            Gname   
        }, { new : true});

        if(!updatedBaby){
            return res.status(404).json({ success : false, message :'Selected Baby details not found'});
        }

        res.json({ success : true, message : 'Baby details updated successfully' , data : updatedBaby});
    }catch(error){
        console.error('Error updating Baby details:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const deleteBaby = async (req,res) => {
    try{
        const {_id} = req.body;

        const deletedBaby = await Baby.findOneAndDelete({_id});

        if(!deletedBaby){
            return res.status(404).json({ success: false , message : 'Baby details not found'});
        }

        res.json({ success : true , message : 'Baby details deleted successfully' , data : deletedBaby});
    }catch(error){
        console.error('Error deleting Baby details:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

exports.addBaby = addBaby;
exports.getBaby = getBaby;
exports.updateBaby = updateBaby;
exports.deleteBaby = deleteBaby;