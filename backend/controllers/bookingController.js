const Booking = require("../models/bookModel");

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const { venue, bookedBy, date, day, timeSlot, purpose } = req.body;

    if (!venue || !bookedBy || !date || !day || !timeSlot || !purpose) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Normalize timeslot (take first if array)
    const slot = Array.isArray(timeSlot) ? timeSlot[0] : timeSlot;

    // Convert date string to Date object
    const bookingDate = new Date(date);

    // Concurrency check -> make sure no duplicate booking
    const conflict = await Booking.findOne({
      venue,
      date: bookingDate,
      timeSlot: slot,
      status: "Booked",
    });

    if (conflict) {
      return res.status(409).json({
        message: "This venue is already booked for the given date & time slot",
      });
    }

    // Save booking
    const newBooking = new Booking({
      venue,
      bookedBy: {
        userId: req.user ? req.user._id : null, // from auth middleware
        username: bookedBy, // from frontend
      },
      date: bookingDate,
      day,
      timeSlot: slot,
      purpose,
    });

    await newBooking.save();

    res.status(201).json(newBooking);
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: 1, timeSlot: 1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Only user who booked OR admin can cancel
    if (
      req.user &&
      booking.bookedBy.userId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized to cancel" });
    }

    booking.status = "Cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled", booking });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
