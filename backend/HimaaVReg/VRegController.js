const mongoose = require('mongoose');
const Vaccine = require('./VRegModel');


const addVac = async(req,res) => {
    try{
        
            const{ vname, manf_date, expi_Date, quantity ,notes} = req.body;

            const manDate=Array.isArray(manf_date)?manf_date.join(', '):manf_date;       //if there's a date
            const expireDate=Array.isArray(expi_Date)?expi_Date.join(', '):expi_Date;

            const newVaccine =  new Vaccine({
                vname,      
                manf_date:manDate,
                expi_Date:expireDate,
                quantity,
                
                notes      
            });

            await newVaccine.save();
            res.json({ success : true , message : 'Vaccine added successfully'});
        }
    catch(error){
        console.error('Error adding Vaccine: ' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const getVac = async (req,res) => {
    try{
        const allVaccine = await Vaccine.find();
        res.json({allVaccine});
    }catch(error){
        console.error('Error getting vaccine:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const updateVac = async (req,res) => {

    try{

        const { _id, vname, manf_date, expi_Date, quantity, notes} = req.body;

        

        const updatedVac = await Vaccine.findOneAndUpdate({_id} ,{
                _id,
                vname,      
                manf_date,
                expi_Date,
                quantity,
                notes  
        }, { new : true});

        if(!updatedVac){
            return res.status(404).json({ success : false, message :'Selected vaccine not found'});
        }

        res.json({ success : true, message : 'vaccine updated successfully' , data : updatedVac});
    }catch(error){
        console.error('Error updating vaccine:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const deleteVac = async (req,res) => {
    try{
        const {_id} = req.body;

        const deletedVac = await Vaccine.findOneAndDelete({_id});

        if(!deletedVac){
            return res.status(404).json({ success: false , message : 'Vaccine not found'});
        }

        res.json({ success : true , message : 'Vaccine deleted successfully' , data : deletedVac});
    }catch(error){
        console.error('Error deleting Vaccine:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}
exports.addVac = addVac;
exports.getVac = getVac;
exports.updateVac = updateVac;
exports.deleteVac = deleteVac;