const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  updateUser
} = require('../controllers/userController');

const { protect, requireRole } = require('../auth/authMiddleware');

router.post('/login', loginUser);

// Only superadmin can create users
router.post('/register', protect, requireRole('superadmin'), registerUser);

// Only superadmin can get all users
router.get('/', protect, requireRole('superadmin'), getAllUsers);
router.delete("/delete/:id", protect, requireRole("superadmin"), deleteUser);
router.put("/update/:id", protect, requireRole("superadmin"), updateUser);
module.exports = router;
