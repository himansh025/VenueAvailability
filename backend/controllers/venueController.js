const Venue = require('../models/venueModel');
const Booking = require('../models/bookVenueModel');
const User = require('../models/userModel')

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

const timeSlots = [
  '09:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '12:00-13:00',
  '13:00-14:00',
  '14:00-15:00',
  '15:00-16:00'
];

exports.getVenuesWithStatus = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const formattedDate = new Date(date);
    formattedDate.setUTCHours(0, 0, 0, 0);

    const venues = await Venue.find();

    const venueStatusList = await Promise.all(
      venues.map(async (venue) => {
        // Get bookings for this venue on the given date
        const bookings = await Booking.find({
          venue: venue._id,
          date: formattedDate,
          status: "Booked",
        });

        // Extract booked slots
        const bookedSlots = await Promise.all(
          bookings.map(async (b) => {
            const user = await User.findById(b.bookedBy).select("name");
            return {
              timeSlot: b.timeSlot,
              bookedBy: {
                bookingId: b.bookedBy,
                bookingName: user ? user.name : "unknown"

              }
            }
          }))

        // Times already booked
        const unavailableTimes = bookedSlots.map((b) => b.timeSlot);

        // Available = total - booked
        const availableTimes = timeSlots.filter(
          (slot) => !unavailableTimes.includes(slot)
        );

        // Return all bookedBy as array, or [] if none
        const isAvailable = availableTimes.length > 0;

        return {
          ...venue.toObject(),
          availableTimes,
          unavailableTimes,
          isAvailable,
          bookedSlots,   // keep details
        };
      })
    );

    // console.log(venueStatusList)

    res.status(200).json({
      success: true,
      count: venueStatusList.length,
      data: venueStatusList,
    });
  } catch (err) {
    console.error("Error fetching venue status:", err);
    res.status(500).json({ message: "Server error" });
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
