const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// @route   GET /api/projects
// @desc    Get all projects user is part of
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let projects;
    
    // Admins can see all projects, members only see projects they are members of or own
    if (req.user.role === 'ADMIN') {
      projects = await Project.find().populate('ownerId', 'name email').populate('members', 'name email');
    } else {
      projects = await Project.find({
        $or: [{ ownerId: req.user._id }, { members: req.user._id }]
      }).populate('ownerId', 'name email').populate('members', 'name email');
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/projects
// @desc    Create a new project
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { name, description, members, themeColor } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Project name is required' });
    }

    const project = await Project.create({
      name,
      description,
      ownerId: req.user._id,
      members: members || [],
      themeColor: themeColor || '#14E8CE'
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete a project
// @access  Private (Admin or Owner only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Only Admin or the Project Owner can delete
    if (req.user.role !== 'ADMIN' && project.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized to delete this project' });
    }

    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
