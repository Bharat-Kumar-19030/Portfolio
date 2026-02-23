const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const upload = require('../middleware/upload');

// GET /api/projects - Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// POST /api/projects - Create a project with image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, techStack, features, githubLink, liveLink, date, featured } = req.body;

    const projectData = {
      title,
      description,
      techStack: techStack ? (typeof techStack === 'string' ? JSON.parse(techStack) : techStack) : [],
      features: features ? (typeof features === 'string' ? JSON.parse(features) : features) : [],
      githubLink,
      liveLink,
      date,
      featured: featured === 'true' || featured === true,
    };

    if (req.file) {
      projectData.image = `/uploads/${req.file.filename}`;
    }

    const project = await Project.create(projectData);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project: ' + error.message });
  }
});

// PUT /api/projects/:id - Update a project
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, description, techStack, features, githubLink, liveLink, date, featured } = req.body;
    
    const updateData = {
      title,
      description,
      techStack: techStack ? (typeof techStack === 'string' ? JSON.parse(techStack) : techStack) : [],
      features: features ? (typeof features === 'string' ? JSON.parse(features) : features) : [],
      githubLink,
      liveLink,
      date,
      featured: featured === 'true' || featured === true,
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const project = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!project) return res.status(404).json({ error: 'Project not found' });

    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// DELETE /api/projects/:id - Delete a project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;
