const mongoose = require('mongoose');
const Patients = require('./AddPModel');


const addPatients = async(req,res) => {
    try{
        
            const{ name , sex , age , address, mobile, clinicID} = req.body;
            const newPatient =  new Patients({
                name,      
                sex,
                age,
                address,     
                mobile,
                clinicID     
            });

            await newPatient.save();
            res.json({ success : true , message : 'Patient added successfully'});
        }
    catch(error){
        console.error('Error adding Patient: ' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const getPatients = async (req,res) => {
    try{
        const allPatient = await Patients.find();
        res.json({allPatient});
    }catch(error){
        console.error('Error getting Patient:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const updatePatients = async (req,res) => {

    try{

        const { _id, name , sex , age , address, mobile, clinicID} = req.body;

        const updatedPatient = await Patients.findOneAndUpdate({_id} ,{
                name,      
                sex,
                age,
                address,     
                mobile,
                clinicID  
        }, { new : true});

        if(!updatedPatient){
            return res.status(404).json({ success : false, message :'Selected Patient not found'});
        }

        res.json({ success : true, message : 'Dengue Patient updated successfully' , data : updatedPatient});
    }catch(error){
        console.error('Error updating Patient:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const deletePatients = async (req,res) => {
    try{
        const {_id} = req.body;

        const deletedPatient = await Patients.findOneAndDelete({_id});

        if(!deletedPatient){
            return res.status(404).json({ success: false , message : 'Patient not found'});
        }

        res.json({ success : true , message : 'Patient deleted successfully' , data : deletedPatient});
    }catch(error){
        console.error('Error deleting Patient:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}
exports.addPatients = addPatients;
exports.getPatients = getPatients;
exports.updatePatients = updatePatients;
exports.deletePatients = deletePatients;