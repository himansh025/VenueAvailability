const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  venue: { type:String, required: true },
  bookedBy:{
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   username:{type:String,required:true}
  } 
  ,
  day: { type: String, required: true },
  date:{type :Date ,required:true},
  timeSlot: {
  type: String,
  required: true
}
,
  status: { 
    type: String, 
    enum: ['Booked', 'Cancelled', 'Completed'], 
    default: 'Booked' 
  },
  purpose:{type:String,required:true}
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
