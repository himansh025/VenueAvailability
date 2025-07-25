const Venue = require('../models/venueModel');

exports.addVenue = async (req, res) => {
  try {

    if (!['admin', 'superadmin'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Unauthorized to add venue' });
    }

    const venue = new Venue   (req.body);
    await venue.save();

    res.status(201).json({ message: 'Venue added successfully', venue });
  } catch (err) {
    res.status(500).json({ message: 'Error adding venue', error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
const venue=await Venue.find({});
console.log(venue)
    res.status(200).json({ message: 'Venue fetch successfully', venue });
  } catch (err) {
    res.status(500).json({ message: 'Error adding venue', error: err.message });
  }
};


exports.updateVenue = async (req, res) => {
  try {
    if (!['superadmin'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Unauthorized to update venue' });
    }

    const updated = await Venue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Venue not found' });
    }

    res.json({ message: 'Venue updated', venue: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating venue', error: err.message });
  }
};


exports.deleteVenue = async (req, res) => {
  try {
    if (!['superadmin'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Unauthorized to delete venue' });
    }

    const deleted = await Venue.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Venue not found' });
    }

    res.json({ message: 'Venue deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting venue', error: err.message });
  }
};
