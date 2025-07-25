const express = require('express');
const {
  addVenue,
  updateVenue,
  deleteVenue,
  getVenuesWithStatus
} = require('../controllers/venueController');
const auth = require('../auth/authMiddleware');

const router = express.Router();

router.get('/status', getVenuesWithStatus)
router.post('/',  auth.protect,addVenue);
router.put('/:id',auth.protect,  updateVenue);
router.delete('/:id',auth.protect,  deleteVenue);

module.exports = router;
