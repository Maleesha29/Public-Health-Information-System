const mongoose = require('mongoose');
const RS = require('./RSModel');
const { error } = require('console');

const addRSub = async (req, res) => {
    try {

        const { vname, vemail, vcno, vnic, vtype, location, details, specialNotes } = req.body;
        const newRSub = new RS({

            vname,
            vemail,
            vcno,
            vnic,
            vtype,
            location,
            details,
            specialNotes
        });

        await newRSub.save();
        res.json({ success: true, message: 'Raid submission added successfully' });
    }
    catch (error) {
        console.error('Error adding Raid submission: ', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const getRSub = async (req, res) => {
    try {
        const allRS = await RS.find();
        res.json({ allRS });
    } catch (error) {
        console.error('Error getting Raid submission:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const updateRSub = async (req, res) => {

    try {

        const { _id, vname, vemail, vcno, vnic, vtype, location, details, specialNotes } = req.body;

        const updatedRS = await RS.findOneAndUpdate({ _id }, {
            _id,
            vname,
            vemail,
            vcno,
            vnic,
            vtype,
            location,
            details,
            specialNotes
        }, { new: true });

        if (!updatedRS) {
            return res.status(404).json({ success: false, message: 'Selected Raid submission not found' });
        }

        res.json({ success: true, message: 'Raid submission updated successfully', data: updatedRS });
    } catch (error) {
        console.error('Error updating Raid submission:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const deleteRSub = async (req, res) => {
    try {
        const { _id } = req.body;

        const deletedRS = await RS.findOneAndDelete({ _id });

        if (!deletedRS) {
            return res.status(404).json({ success: false, message: 'Raid submission not found' });
        }

        res.json({ success: true, message: 'Raid submission deleted successfully', data: deletedRS });
    } catch (error) {
        console.error('Error deleting Raid submission:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

exports.addRSub = addRSub;
exports.getRSub = getRSub;
exports.updateRSub = updateRSub;
exports.deleteRSub = deleteRSub;