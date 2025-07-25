const express = require('express');
const { bookVenue, cancelBooking } = require('../controllers/bookingController');
const auth = require('../auth/authMiddleware');

const router = express.Router();

router.post('/',auth.protect, bookVenue);
router.put('/cancel/:id',auth.protect, cancelBooking);

module.exports = router;
