const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
  },
  techStack: [{
    type: String,
    trim: true,
  }],
  features: [{
    type: String,
    trim: true,
  }],
  image: {
    type: String,
    default: '',
  },
  githubLink: {
    type: String,
    trim: true,
    default: '',
  },
  liveLink: {
    type: String,
    trim: true,
    default: '',
  },
  date: {
    type: String,
    trim: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
