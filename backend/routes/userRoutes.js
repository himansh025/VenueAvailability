const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers
} = require('../controllers/userController');

const { protect, requireRole } = require('../auth/authMiddleware');

router.post('/login', loginUser);

// Only superadmin can create users
router.post('/register', protect, requireRole('superadmin'), registerUser);

// Only superadmin can get all users
router.get('/', protect, requireRole('superadmin'), getAllUsers);

module.exports = router;
