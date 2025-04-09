const mongoose = require('mongoose');
const Denguestaff = require('./AssignDengueModel');

const addstaffdengue = async (req, res) => {
    try {
        const { venue, date, staffmember, time } = req.body;

        const d_assigndate = Array.isArray(date) ? date.join(', ') : date;

        const newassignfordengue = new Denguestaff({
            venue,
            date: d_assigndate,
            staffmember,
            time,
        });

        await newassignfordengue.save();
        res.json({ success: true, message: 'staff added successfully' });
    }
    catch (error) {
        console.error('Error adding staff: ', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const getstaffdengue = async (req, res) => {
    try {
        const allstaffdengue = await Denguestaff.find();
        res.json({ allstaffdengue });
    } catch (error) {
        console.error('Error getting Staff:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const updatestaffdengue = async (req, res) => {
    try {
        const { type, staffmember, date, location, description } = req.body;

        const updatedstaffdengue = await Denguestaff.findOneAndUpdate({ _id }, {
            type,
            staffmember,
            date: d_assigndate,
            location,
            description,
        }, { new: true });

        if (!updatedstaffdengue) {
            return res.status(404).json({ success: false, message: 'Selected staff not found' });
        }

        res.json({ success: true, message: 'Leave updated successfully', data: updatedstaffdengue });
    } catch (error) {
        console.error('Error updating Leave:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const deletestaffdengue = async (req, res) => {
    try {
        const { _id } = req.body;

        const deletedStaff = await Denguestaff.findOneAndDelete({ _id }); // Corrected variable name

        if (!deletedStaff) {
            return res.status(404).json({ success: false, message: 'Staff not found' });
        }

        res.json({ success: true, message: 'Staff deleted successfully', data: deletedStaff });
    } catch (error) {
        console.error('Error deleting staff:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



exports.addstaffdengue = addstaffdengue;
exports.getstaffdengue = getstaffdengue;
exports.updatestaffdengue = updatestaffdengue;
exports.deletestaffdengue = deletestaffdengue;