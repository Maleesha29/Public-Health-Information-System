const mongoose = require('mongoose');
const Leave = require('./LeaveModel');

const addLeave = async (req, res) => {
    try {
        const { name, staffid, email, position, doleave, leavestrt, leaveend, leaveType } = req.body;

        const formatleavedate = Array.isArray(leavestrt) ? leavestrt.join(', ') : leavestrt;
        const formatleaveend = Array.isArray(leaveend) ? leaveend.join(', ') : leaveend;

        const newLeave = new Leave({
            name,
            staffid,
            email,
            position,
            doleave,
            leavestrt: formatleavedate,
            leaveend: formatleaveend,
            leaveType
        });

        await newLeave.save();
        res.json({ success: true, message: 'Leave added successfully' });
    } catch (error) {
        console.error('Error adding Leave: ', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getLeave = async (req, res) => {
    try {
        const allLeave = await Leave.find();
        res.json({ allLeave });
    } catch (error) {
        console.error('Error getting Leave:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const updateLeave = async (req, res) => {
    try {
        const { _id, name, email, staffid, position, doleave, leavestrt, leaveend, leaveType } = req.body;

        const formatDate = (date) => {
            // Your date formatting logic here
            return date; // Placeholder, replace with your actual logic
        };

        const formatleavedate = formatDate(leavestrt);
        const formatleaveend = formatDate(leaveend);

        const updatedLeave = await Leave.findOneAndUpdate({ _id }, {
            _id,
            name,
            email,
            staffid,
            position,
            doleave,
            leavestrt: formatleavedate,
            leaveend: formatleaveend,
            leaveType
        }, { new: true });

        if (!updatedLeave) {
            return res.status(404).json({ success: false, message: 'Selected leave not found' });
        }

        res.json({ success: true, message: 'Leave updated successfully', data: updatedLeave });
    } catch (error) {
        console.error('Error updating Leave:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const deleteLeave = async (req, res) => {
    try {
        const { _id } = req.body;

        const deletedLeave = await Leave.findOneAndDelete({ _id });

        if (!deletedLeave) {
            return res.status(404).json({ success: false, message: 'Leave not found' });
        }

        res.json({ success: true, message: 'Leave deleted successfully', data: deletedLeave });
    } catch (error) {
        console.error('Error deleting Leave:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.addLeave = addLeave;
exports.getLeave = getLeave;
exports.updateLeave = updateLeave;
exports.deleteLeave = deleteLeave;
