const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_prod', {
    expiresIn: '30d',
  });
};

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please add all fields' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'MEMBER',
    });

    if (user) {
      // Auto-Seed a Default Demo Project for the new user
      try {
        const Project = require('../models/Project');
        const Task = require('../models/Task');
        
        const demoProject = await Project.create({
          name: '🚀 Ethara Genesis Launch Board',
          description: 'A dedicated workspace to track our advanced Reinforcement Learning and human-aligned data pipelines.',
          ownerId: user._id,
          members: [user._id],
          themeColor: '#14E8CE'
        });

        await Task.create([
          {
            title: 'Initial Model Fine-Tuning',
            description: 'Implement core reinforcement learning rewards.',
            status: 'TODO',
            projectId: demoProject._id,
            assigneeId: user._id,
            checklist: [{ title: 'Import data', isCompleted: false }]
          },
          {
            title: 'Analyze Task Feedback',
            description: 'Evaluate output alignment and performance metrics.',
            status: 'IN_PROGRESS',
            projectId: demoProject._id,
            assigneeId: user._id
          },
          {
            title: 'Establish Brand Identity',
            description: 'Set up glassmorphic CSS styling variables for visual excellence.',
            status: 'DONE',
            projectId: demoProject._id,
            assigneeId: user._id
          }
        ]);
      } catch (seedErr) {
        console.error('Seeding error:', seedErr);
      }

      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate a user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
