const mongoose = require('mongoose');
const VacAppointment = require('./VAppModel');


const addVacApp = async(req,res) => {
    try{
        
            const{ v_name, quantity , date, location} = req.body;

            const Date=Array.isArray(date)?date.join(', '):date; 

            const newVaccineApp =  new VacAppointment({
                v_name,        
                quantity,
                date:Date,    //date
                location    
            });

            await newVaccineApp.save();
            res.json({ success : true , message : 'Vaccine appointment added successfully'});
        }
    catch(error){
        console.error('Error adding Vaccine appointment: ' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const getVacApp = async (req,res) => {
    try{
        const allVaccineAppointments = await VacAppointment.find();
        res.json({allVaccineAppointments});
    }catch(error){
        console.error('Error getting Vaccine appointment:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const updateVacApp = async (req,res) => {

    try{

        const { _id, v_name, quantity , date , location} = req.body;

        const updatedVacApp = await VacAppointment.findOneAndUpdate({_id} ,{
                _id,
                v_name,                      
                quantity,
                date,
                location  
        }, { new : true});

        if(!updatedVacApp){
            return res.status(404).json({ success : false, message :'Selected Vaccine appointment not found'});
        }

        res.json({ success : true, message : 'Vaccine appointment updated successfully' , data : updatedVacApp});
    }catch(error){
        console.error('Error updating Vaccine appointment:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const deleteVacApp = async (req,res) => {
    try{
        const {_id} = req.body;

        const deletedVacApp = await VacAppointment.findOneAndDelete({_id});

        if(!deletedVacApp){
            return res.status(404).json({ success: false , message : 'Vaccine appointment not found'});
        }

        res.json({ success : true , message : 'Vaccine appointment deleted successfully' , data : deletedVacApp});
    }catch(error){
        console.error('Error deleting Vaccine appointment:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}
exports.addVacApp = addVacApp;
exports.getVacApp = getVacApp;
exports.updateVacApp = updateVacApp;
exports.deleteVacApp = deleteVacApp;