const express = require('express');
const {
  addVenue,
  updateVenue,
  deleteVenue,
  getVenuesWithStatus
} = require('../controllers/venueController');
const { protect, requireRole } = require('../auth/authMiddleware');

const router = express.Router();

router.get('/', getVenuesWithStatus)
router.post('/',protect,requireRole('superadmin') ,addVenue);
router.put('/:id',protect,requireRole('superadmin'),   updateVenue);
router.delete('/:id',protect,requireRole('superadmin'),   deleteVenue);

module.exports = router;
