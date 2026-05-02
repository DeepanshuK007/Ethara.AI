const mongoose = require('mongoose');

const ChecklistItemSchema = new mongoose.Schema({
  title: String,
  isCompleted: { type: Boolean, default: false }
});

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['TODO', 'IN_PROGRESS', 'DONE'],
    default: 'TODO',
  },
  dueDate: {
    type: Date,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  assigneeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  checklist: [ChecklistItemSchema], // Smart Task Breakdown USP
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
