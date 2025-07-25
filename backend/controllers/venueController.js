const Venue = require('../models/venueModel');
const Booking = require('../models/bookVenueModel');
const e = require('express');

exports.addVenue = async (req, res) => {
  try {

    if (!['admin', 'superadmin'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Unauthorized to add venue' });
    }

    const venue = new Venue(req.body);
    await venue.save();

    res.status(201).json({ message: 'Venue added successfully', venue });
  } catch (err) {
    res.status(500).json({ message: 'Error adding venue', error: err.message });
  }
};


exports.getVenuesWithStatus = async (req, res) => {
  const { date, timeSlot } = req.query;
  
  // Validate required parameters
  if (!date || !timeSlot) {
    return res.status(400).json({ 
      message: "Date and timeSlot are required parameters" 
    });
  }
  
  const formattedDate = new Date(date);
  formattedDate.setUTCHours(0, 0, 0, 0);
  
  try {
    // Get all venues
    const venues = await Venue.find();
    
    // Check booking status for each venue
    const venueStatusList = await Promise.all(
      venues.map(async (venue) => {
        const booking = await Booking.findOne({
          venue: venue._id,
          date: formattedDate,
          timeSlot,
          status: 'Booked'
        }).populate('bookedBy', 'name email');
        
        return {
          ...venue.toObject(),
          availability: booking ? 'Unavailable' : 'Available',
          currentBooking: booking ? {
            bookedBy: booking.bookedBy,
            purpose: booking.purpose,
            status: booking.status,
            bookingId: booking._id
          } : null
        };
      })
    );
    
    res.status(200).json({
      success: true,
      count: venueStatusList.length,
      data: venueStatusList
    });
    
  } catch (err) {
    console.error('Error fetching venue status:', err);
    res.status(500).json({ 
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
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
