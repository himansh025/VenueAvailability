const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue' },
  bookedBy: {type:mongoose.Schema.Types.ObjectId,ref:'User'}, 
  date: String,     
  timeSlot: String,
  purpose: String,
  status: { 
    type: String, 
    enum: ['Available', 'Unavailable'], 
    default: 'Available' 
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
