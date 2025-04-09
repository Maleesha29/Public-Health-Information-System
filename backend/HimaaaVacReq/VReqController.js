const mongoose = require('mongoose');
const VaccineRq = require('./VReqModel');


const addVacRq = async(req,res) => {
    try{
        
            const{ type, quantity,esti_Date,notification} = req.body;
            const newVaccineRq =  new VaccineRq({
                type,        
                quantity,
                esti_Date,
                notification, 
            });

            await newVaccineRq.save();
            res.json({ success : true , message : 'Vaccine request added successfully'});
        }
    catch(error){
        console.error('Error adding Vaccine request: ' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const getVacRq = async (req,res) => {
    try{
        const allVaccineRq = await VaccineRq.find();
        res.json({allVaccineRq});
    }catch(error){
        console.error('Error getting Vaccine request:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const updateVacRq = async (req,res) => {

    try{

        const { _id, vName, quantity} = req.body;

        const updatedVacRq = await VaccineRq.findOneAndUpdate({_id} ,{
                vName,                      
                quantity  
        }, { new : true});

        if(!updatedVacRq){
            return res.status(404).json({ success : false, message :'Selected Vaccine request not found'});
        }

        res.json({ success : true, message : 'Vaccine request updated successfully' , data : updatedVacRq});
    }catch(error){
        console.error('Error updating Vaccine request:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const deleteVacRq = async (req,res) => {
    try{
        const {_id} = req.body;

        const deletedVacRq = await VaccineRq.findOneAndDelete({_id});

        if(!deletedVacRq){
            return res.status(404).json({ success: false , message : 'Vaccine request not found'});
        }

        res.json({ success : true , message : 'Vaccine request deleted successfully' , data : deletedVacRq});
    }catch(error){
        console.error('Error deleting Vaccine request:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}
exports.addVacRq = addVacRq;
exports.getVacRq = getVacRq;
exports.updateVacRq = updateVacRq;
exports.deleteVacRq = deleteVacRq;