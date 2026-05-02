const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Project = require('../models/Project');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

// Helper to check if user has access to project
const hasProjectAccess = async (projectId, userId, userRole) => {
  if (userRole === 'ADMIN') return true;
  const project = await Project.findById(projectId);
  if (!project) return false;
  return project.ownerId.toString() === userId.toString() || project.members.includes(userId);
};

// @route   GET /api/tasks/project/:projectId
// @desc    Get all tasks for a specific project
// @access  Private
router.get('/project/:projectId', protect, async (req, res) => {
  try {
    const hasAccess = await hasProjectAccess(req.params.projectId, req.user._id, req.user.role);
    if (!hasAccess) return res.status(403).json({ message: 'Not authorized for this project' });

    const tasks = await Task.find({ projectId: req.params.projectId }).populate('assigneeId', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, dueDate, projectId, assigneeId, checklist } = req.body;

    if (!title || !projectId) {
      return res.status(400).json({ message: 'Title and projectId are required' });
    }

    const hasAccess = await hasProjectAccess(projectId, req.user._id, req.user.role);
    if (!hasAccess) return res.status(403).json({ message: 'Not authorized for this project' });

    const task = await Task.create({
      title,
      description,
      status: 'TODO',
      dueDate,
      projectId,
      assigneeId,
      checklist: checklist || []
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update task status (drag & drop) or details
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const hasAccess = await hasProjectAccess(task.projectId, req.user._id, req.user.role);
    if (!hasAccess) return res.status(403).json({ message: 'Not authorized to update this task' });

    // Handle Gamification XP if task moves to DONE
    if (req.body.status === 'DONE' && task.status !== 'DONE') {
      const user = await User.findById(req.user._id);
      user.xpPoints += 10; // Award 10 XP
      await user.save();
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const hasAccess = await hasProjectAccess(task.projectId, req.user._id, req.user.role);
    if (!hasAccess) return res.status(403).json({ message: 'Not authorized to delete this task' });

    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
