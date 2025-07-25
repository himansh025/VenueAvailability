const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true },
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  date: { type: Date, required: true }, // use Date for comparisons

  timeSlot: { 
    type: String, 
    required: true, 
    enum: ['09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00','13:00-14:00','14:00-15:00','15:00-14:00'] 
  },

  purpose: { type: String },
  
  status: { 
    type: String, 
    enum: ['Booked', 'Cancelled', 'Completed'], 
    default: 'Booked' 
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

module.exports = mongoose.model('Booking', bookingSchema);
