const Booking = require('../models/Booking');
const Venue = require('../models/Venue');
const User = require('../models/User');


exports.bookVenue = async (req, res) => {
  try {
    const { venue, date, timeSlot, purpose } = req.body;
    const bookedBy = req.user._id; 

    const existing = await Booking.findOne({ venue, date, timeSlot, status: 'Unavailable' });

    if (existing) {
      return res.status(409).json({ message: 'This venue is already booked for the selected slot.' });
    }

    const booking = new Booking({
      venue,
      bookedBy,
      date,
      timeSlot,
      purpose,
      status: 'Unavailable'
    });

    await booking.save();
    res.status(201).json({ message: 'Booking successful', booking });
  } catch (error) {
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
};

// Get all bookings (optionally filter by venue/date/user)
exports.getBookings = async (req, res) => {
  try {
    const filters = req.query; // e.g., ?venue=xyz&date=2025-07-25
    const bookings = await Booking.find(filters)
      .populate('venue')
      .populate('bookedBy', 'name email'); 
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Optional: only allow user who booked it or admin to cancel
    if (!req.user._id.equals(booking.bookedBy)) {
      return res.status(403).json({ message: 'Unauthorized to cancel this booking' });
    }

    await Booking.findByIdAndDelete(bookingId);
    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Cancellation failed', error: error.message });
  }
};
