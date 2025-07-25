const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: String,
  location: String,
  capacity: Number,
  type: String, 
  // e.g., 'Seminar Hall', 'Classroom', etc.
});

module.exports = mongoose.model('Venue', venueSchema);
