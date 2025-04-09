const mongoose = require('mongoose');
const VioReport = require('./RVModel');
const multer = require('multer');
const path = require('path');
const { error } = require('console');


const addVioReport = async (req, res) => {
    try {
        console.log(req.files); 

        const { ro_name, ro_email, ro_mobile, v_location, date, v_type, v_description, v_name, v_nic, v_mobile, v_email, decision } = req.body;

        console.log(req.file);
        const imagesData = req.files.map(file => ({
            data: file.buffer.toString('base64'),
            contentType: file.mimetype,
        }
        ));

        console.log(imagesData);

        const newVioReport = new VioReport({
            ro_name,
            ro_email,
            ro_mobile,
            v_location,
            date,
            v_type,
            v_description,
            v_name,
            v_email,
            v_mobile,
            v_nic,
            decision,
            evidence: imagesData,
        });

        await newVioReport.save();
        if (!req.files || req.files.length === 0) {
            return res.status(201).json({ success: true, message: 'No files were uploaded.' });
        } else {
            res.json({ success: true, message: 'Violation report added successfully' });
        }
    } catch (error) {
    console.error('Error adding Violation report:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
}
};


const getVioReport = async (req, res) => {
    try {
        const allVioReports = await VioReport.find();
        res.json({ success: true, allVioReports });
    } catch (error) {
        console.error('Error getting Violation report:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const updateVioReport = async (req, res) => {
    try {
        const { _id, ro_name, ro_email, ro_mobile, date, v_location, v_type, v_description, v_name, v_nic, v_mobile, v_email, decision } = req.body;

        const updatedVioReport = await VioReport.findOneAndUpdate({ _id }, {
            _id,
            ro_name,
            ro_email,
            ro_mobile,
            date,
            v_location,
            v_type,
            v_description,
            v_name,
            v_email,
            v_mobile,
            v_nic,
            decision,
        }, { new: true });

        if (!updatedVioReport) {
            return res.status(404).json({ success: false, message: 'Selected Violation report not found' });
        }

        res.json({ success: true, message: 'Violation report updated successfully', data: updatedVioReport });
    } catch (error) {
        console.error('Error updating Violation report:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const deleteVioReport = async (req, res) => {
    try {
        const { _id } = req.body;
        const deletedVioReport = await VioReport.findOneAndDelete({ _id });

        if (!deletedVioReport) {
            return res.status(404).json({ success: false, message: 'Violation report not found' });
        }

        res.json({ success: true, message: 'Violation report deleted successfully', data: deletedVioReport });
    } catch (error) {
        console.error('Error deleting Violation report:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = { addVioReport, getVioReport, updateVioReport, deleteVioReport };
