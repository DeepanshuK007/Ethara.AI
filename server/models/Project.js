const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  themeColor: {
    type: String,
    default: '#14E8CE' // Ethara.AI Cyan
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
