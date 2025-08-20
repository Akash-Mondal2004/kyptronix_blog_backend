const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required.' });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: 'User already exists.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Registration successful.' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed.', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required.' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: 'Invalid credentials.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials.' });

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1d' });

    res.json({ message: 'Login successful.', token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed.', error: error.message });
  }
};