const { Login , validate} = require('./LoginModel');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const addLogin = async(req,res) => {
    try{
        
            const{error} = validate(req.body);

            if(error){
                return res.status(400).json({success : false , message : error.details[0].message});
            }

            const user = await Login.findOne({username : req.body.username});
            if(user){
                return res.status(409).json({ message : 'This user name is already exists'});
            }

            const salt = await bcrypt.genSalt(Number(10));
            const hashPassword = await bcrypt.hash(req.body.password , salt);
            const newuser =  new Login({
                
                ...req.body,
                password : hashPassword       
            });

            await newuser.save();
            res.json({ success : true , message : 'User added successfully'});
        }
    catch(error){
        console.error('Error adding user: ' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}




exports.addLogin = addLogin;

