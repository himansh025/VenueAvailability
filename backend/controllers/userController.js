const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// 🔐 Register (only superadmin can create other users)
exports.registerUser = async (req, res) => {
  try {
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Only superadmin can create users' });
    }

    const { name, email, password, role } = req.body;
    console.log(email)
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

// 🔐 Login
exports.loginUser = async (req, res) => {
 try {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid email ' });
  }

  const passMatched = await bcrypt.compare(password, user.password);
  
  if (!passMatched) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.json({
    token: generateToken(user),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });

} catch (err) {
  res.status(500).json({ message: 'Login failed', error: err.message });
}
};

// 🗂️ Get all users (superadmin only)
exports.getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Only superadmin can view all users' });
    }

    const users = await User.find().select('-password');
    res.json(users);

  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};
