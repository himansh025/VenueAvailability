const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({quiet:true});

// Route imports
const venueRoutes = require('./routes/venueRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// API Routes
app.use('/api/venues', venueRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users',userRoutes );
// Root route
app.get('/', (req, res) => {
res.send('🎓 College Venue Booking API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`🚀 Server running on port ${PORT}`);
});