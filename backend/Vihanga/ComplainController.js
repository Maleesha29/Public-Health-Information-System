const mongoose = require('mongoose');
const Complain = require('./ComplainModel');
const multer = require('multer');
const path = require('path');
const { error } = require('console');

const addComplain = async (req, res) => {
    try {

        const { fname, lname, mobile, email, NIC, date, yaddress, ctype, cdesc, area } = req.body;

        formattedDate = Array.isArray(date) ? date.join(', ') : date;



        console.log(req.files);//checking the image files in memorystorage

        //adding images to the array
        const imagesData = req.files.map(file => ({
            data: file.buffer.toString('base64'),
            contentType: file.mimetype,
        }
        ));

        console.log(imagesData);

        const newComplain = new Complain({
            fname,
            lname,
            mobile,
            email,
            NIC,
            date: formattedDate,
            yaddress,
            ctype,
            cdesc,
            area,
            images: imagesData,

        });

        await newComplain.save();
        if (!req.files || req.files.length === 0) {
            return res.status(201).json({ success: true, message: 'No files were uploaded.' });
        }
        else {
            res.json({ success: true, message: 'Complain submitted successfully' });
        }
    }

    catch (error) {
        console.error('Error adding Dengue Complain: ', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const getComplain = async (req, res) => {
    try {
        const allComplain = await Complain.find();
        res.status(200).json(allComplain);
    } catch (error) {
        console.error('Error getting Complain:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const updateComplain = async (req, res) => {

    try {

        const { _id, fname, lname, mobile, email, NIC, yaddress, ctype, cdesc } = req.body;

        const updatedComplain = await Complain.findOneAndUpdate({ _id }, {
            _id,
            fname,
            lname,
            mobile,
            email,
            NIC,
            yaddress,
            ctype,
            cdesc,

        }, { new: true });

        if (!updatedComplain) {
            return res.status(404).json({ success: false, message: 'Selected dengue Complain not found' });
        }

        res.json({ success: true, message: 'Dengue complain updated successfully', data: updatedComplain });
    } catch (error) {
        console.error('Error updating complain:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const deleteComplain = async (req, res) => {
    try {
        const { _id } = req.body;

        const deletedComplain = await Complain.findOneAndDelete({ _id });

        if (!deletedComplain) {
            return res.status(404).json({ success: false, message: 'Complain not found' });
        }

        res.json({ success: true, message: 'Complain deleted successfully', data: deletedComplain });
    } catch (error) {
        console.error('Error deleting complain:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
exports.addComplain = addComplain;
exports.getComplain = getComplain;
exports.updateComplain = updateComplain;
exports.deleteComplain = deleteComplain;