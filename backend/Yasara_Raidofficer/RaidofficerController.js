const mongoose = require('mongoose');
const RaidOfficer = require('./RaidofficerModel');

exports.addraidofficer = async (req, res) => {
    try {
        const { Name, Type, Address, officer, compID ,Specialnotes,DateTime} = req.body;

        const d_dateandtime = Array.isArray(DateTime) ? date.join(',') : DateTime;

        const newassignraidofficer = new RaidOfficer({
            Name,
            Type,
            Address,
            officer,
            compID,
            Specialnotes,
            DateTime:d_dateandtime,

        });

        await newassignraidofficer.save();
        res.json({ success: true, message: 'Officer added successfully' });
    } catch (error) {
        console.error('Error adding officer: ', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

exports.getraidofficer = async (req, res) => {
    try {
        const allraidofficer = await RaidOfficer.find();
        res.json({ allraidofficer });
    } catch (error) {
        console.error('Error getting Officer:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

exports.deleteraidofficer = async (req, res) => {
    try {
        const { _id } = req.body;

        const deletedofficer = await RaidOfficer.findOneAndDelete({ _id });

        if (!deletedofficer) {
            return res.status(404).json({ success: false, message: 'Officer not found' });
        }

        res.json({ success: true, message: 'Officer deleted successfully', data: deletedofficer });
    } catch (error) {
        console.error('Error deleting Officer:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

