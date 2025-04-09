const mongoose = require('mongoose');
const DocM = require('./DocMModel');


const addDocM = async (req, res) => {
    try {
        const { r_id, ro_name, date, v_name, v_type } = req.body;

        console.log(req.files);
        const fileData = req.files.map(file => ({
            data: file.buffer.toString('base64'),
            contentType: file.mimetype,
        }
        ));

        console.log(fileData);

        const newDocM = new DocM({
            r_id,
            ro_name,
            date,
            v_name,
            v_type,
            documents : fileData,
        });

        await newDocM.save();
        if (!req.files || req.files.length === 0) {
            return res.status(201).json({ success: true, message: 'No files were uploaded.' });
        }
        else {
            res.json({ success: true, message: 'Complain submitted successfully' });
        }
    }
    catch (error) {
        console.error('Error adding Document: ', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const getDocM = async (req, res) => {
    try {
        const allDocM = await DocM.find();
        res.json({ allDocM });
    } catch (error) {
        console.error('Error getting Document:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const updateDocM = async (req, res) => {

    try {

        const { _id, r_id, ro_name, date, v_name, v_type, documents } = req.body;

        const updatedDocM = await DocM.findOneAndUpdate({ _id }, {
            _id,
            r_id,
            ro_name,
            date,
            v_name,
            v_type,
            documents
        }, { new: true });

        if (!updatedDocM) {
            return res.status(404).json({ success: false, message: 'Selected Document not found' });
        }

        res.json({ success: true, message: 'Document updated successfully', data: updatedDocM });
    } catch (error) {
        console.error('Error updating Document:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const deleteDocM = async (req, res) => {
    try {
        const { _id } = req.body;

        const deletedDocM = await DocM.findOneAndDelete({ _id });

        if (!deletedDocM) {
            return res.status(404).json({ success: false, message: 'Document not found' });
        }

        res.json({ success: true, message: 'Document deleted successfully', data: deletedDocM });
    } catch (error) {
        console.error('Error deleting Document:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.addDocM = addDocM;
exports.getDocM = getDocM;
exports.updateDocM = updateDocM;
exports.deleteDocM = deleteDocM;