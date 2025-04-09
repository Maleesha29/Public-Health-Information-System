const mongoose = require('mongoose');
const BVaccine = require('./BVacModel');


const addBabyVac = async(req,res) => {
    try{
        
            const{ type, esti_Date, quantity} = req.body;

            const bvaccinedate = Array.isArray(esti_Date) ? esti_Date.join(', ') : esti_Date;

            const newBabyVac =  new BVaccine({
                type,      
                esti_Date : bvaccinedate,
                quantity       
            });

            await newBabyVac.save();
            res.json({ success : true , message : 'Baby vaccine added successfully'});
        }
    catch(error){
        console.error('Error adding Baby vaccine: ' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const getBabyVac = async (req,res) => {
    try{
        const allBVac = await BVaccine.find();
        res.json({allBVac});
    }catch(error){
        console.error('Error getting Baby vaccine:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const updateBabyVac = async (req,res) => {

    try{

        const { _id, type, esti_Date, quantity} = req.body;

        const updatedBabyVac = await BVaccine.findOneAndUpdate({_id} ,{
                type,      
                esti_Date,
                quantity 
        }, { new : true});

        if(!updatedBabyVac){
            return res.status(404).json({ success : false, message :'Selected Baby vaccine not found'});
        }

        res.json({ success : true, message : 'Baby vaccine updated successfully' , data : updatedBabyVac});
    }catch(error){
        console.error('Error updating Baby vaccine:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const deleteBabyVac = async (req,res) => {
    try{
        const {_id} = req.body;

        const deletedBabyVac = await BVaccine.findOneAndDelete({_id});

        if(!deletedBabyVac){
            return res.status(404).json({ success: false , message : 'Baby vaccine not found'});
        }

        res.json({ success : true , message : 'Baby vaccine deleted successfully' , data : deletedBabyVac});
    }catch(error){
        console.error('Error deleting Baby vaccine:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}
exports.addBabyVac = addBabyVac;
exports.getBabyVac = getBabyVac;
exports.updateBabyVac = updateBabyVac;
exports.deleteBabyVac = deleteBabyVac;