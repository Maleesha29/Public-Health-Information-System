const mongoose = require('mongoose');
const raidstaff = require('./AssignRaidsModel');

const addstaffraids = async (req, res) => {
    try {
        const { type, staffmember, date, location, description } = req.body;

        const r_assignedDate = Array.isArray(date) ? date.join(', ') : date;

        const newassignforraids = new raidstaff({
            type,
            staffmember,
            date: r_assignedDate,
            location,
            description,
        });

        await newassignforraids.save();
        res.json({ success: true, message: 'Staff added successfully' });
    } catch (error) {
        console.error('Error adding staff:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getstaffraids = async (req, res) => {
    try {
        const allstaffraids = await raidstaff.find();
        res.json({ allstaffraids });
    } catch (error) {
        console.error('Error getting staff:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const updatestaffraids = async (req, res) => {
    try {
        const { type, staffmember, date, location, description } = req.body;

        const updatestaffdraids = await raidstaff.findOneAndUpdate({ _id }, {
            type,
            staffmember,
            date,
            location,
            description,
        }, { new: true });

        if (!updatestaffdraids) {
            return res.status(404).json({ success: false, message: 'Selected staff not found' });
        }

        res.json({ success: true, message: 'Staff updated successfully', data: updatestaffdraids });
    } catch (error) {
        console.error('Error updating staff:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const deletestaffraids = async (req, res) => {
    try {
        const { _id } = req.body;

        const deletedstaffraids = await raidstaff.findOneAndDelete({ _id });

        if (!deletedstaffraids) { // Corrected variable name
            return res.status(404).json({ success: false, message: 'Staff not found' });
        }

        res.json({ success: true, message: 'Staff deleted successfully', data: deletedstaffraids });
    } catch (error) {
        console.error('Error deleting staff:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.addstaffraids = addstaffraids;
exports.getstaffraids = getstaffraids;
exports.updatestaffdraids = updatestaffraids;
exports.deletestaffraids = deletestaffraids;
