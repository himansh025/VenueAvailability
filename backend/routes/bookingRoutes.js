const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../auth/authMiddleware'); // Assuming you have one

router.post('/', auth.protect, bookingController.createBooking);
router.get('/', bookingController.getBookings);
router.put('/:id', auth.protect, bookingController.cancelBooking);

module.exports = router;
