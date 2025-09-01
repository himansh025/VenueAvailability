const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const auth = require("../auth/authMiddleware");

router.post("/", auth.protect, bookingController.createBooking);
router.get("/", bookingController.getBookings);
router.delete("/", auth.protect, bookingController.cancelBooking);

module.exports = router;
