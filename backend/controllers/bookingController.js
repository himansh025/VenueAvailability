const Booking = require('../models/bookVenueModel');

// Create Booking (with conflict check)
exports.createBooking = async (req, res) => {
  try {
    const { venueName, day, timeSlot } = req.body;
    const userId = req.user._id; // From auth middleware
console.log( venueName, day, timeSlot)
// console.log(userId)

const existingBooking = await Booking.findOne({
      venue: venueName,
      day,
      timeSlot,
      status: 'Booked'
    });
    console.log(existingBooking)

    if (existingBooking) {
      return res.status(409).json({ message: 'Venue already booked for this time slot.' });
    }

    // Create booking
    const booking = new Booking({
      venue: venueName,
      bookedBy: userId,
      day,
      timeSlot,
      status: 'Booked'
    });
    console.log(booking)

    await booking.save();
    res.status(201).json({ message: 'Booking successful.', booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel Booking
exports.cancelBooking = async (req, res) => {
  try {
    console.log("d")
    const bookingId = req.params.id;
    const user= req.user.id   
   const { day,timeSlot, venueName } = req.body;
console.log(bookingId,user,day,timeSlot,venueName)

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });


// const reqDate = new Date(date).toISOString().slice(0, 10); // "2025-07-28"
// const bookingDate = new Date(booking.date).toISOString().slice(0, 10);
if (
  // bookingDate === reqDate &&
  booking.timeSlot === timeSlot &&
  booking.venue.equals(venueId) &&
  booking.bookedBy.equals(user)
) {
  booking.status = 'Cancelled';
  await booking.save();
  return res.json({ message: 'Booking cancelled.', booking });
} 
 else {
  return res.status(403).json({ message: 'You are not authorized or booking details do not match.' });
}
  
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Bookings (optionally filtered)
exports.getBookings = async (req, res) => {
  try {
    const { date, venueId} = req.query;
    const filter = {};

    if (date) filter.date = date;
    if (venueId) filter.venue = venueId;

    const bookings = await Booking.find(filter)
      .populate('venue', 'name location')
      .populate('bookedBy', 'name email');

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
