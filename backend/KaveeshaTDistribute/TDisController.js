const mongoose = require('mongoose');
const Triposha = require('./TDisModel');


const addTDis = async(req,res) => {
    try{
        
            const{ type, esti_Date, quantity} = req.body;
            const newTDis =  new Triposha({
                type,      
                esti_Date,
                quantity       
            });

            await newTDis.save();
            res.json({ success : true , message : 'Triposha added successfully'});
        }
    catch(error){
        console.error('Error adding Triposha: ' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const getTDis = async (req,res) => {
    try{
        const allTDis = await Triposha.find();
        res.json({allTDis});
    }catch(error){
        console.error('Error getting Triposha:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const updateTDis = async (req,res) => {

    try{

        const { _id, type, esti_Date, quantity} = req.body;

        const updatedTDis = await Triposha.findOneAndUpdate({_id} ,{
            _id,
                type,      
                esti_Date,
                quantity 
        }, { new : true});

        if(!updatedTDis){
            return res.status(404).json({ success : false, message :'Selected Triposha not found'});
        }

        res.json({ success : true, message : 'Triposha updated successfully' , data : updatedTDis});
    }catch(error){
        console.error('Error updating Triposha:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const deleteTDis = async (req,res) => {
    try{
        const {_id} = req.body;

        const deletedTDis = await Triposha.findOneAndDelete({_id});

        if(!deletedTDis){
            return res.status(404).json({ success: false , message : 'Triposha not found'});
        }

        res.json({ success : true , message : 'Triposha deleted successfully' , data : deletedTDis});
    }catch(error){
        console.error('Error deleting Triposha:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}
exports.addTDis = addTDis;
exports.getTDis = getTDis;
exports.updateTDis = updateTDis;
exports.deleteTDis = deleteTDis;