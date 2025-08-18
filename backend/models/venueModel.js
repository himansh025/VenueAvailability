const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: String,
  location: String,
  capacity: Number,
  type: String, 
  // e.g., 'Seminar Hall', 'Classroom', etc.
  //  isAvailable: { type: Boolean, default: true } 
});

module.exports = mongoose.model('Venue', venueSchema);
