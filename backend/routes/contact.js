const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const contact = await Contact.create({ name, email, subject, message });
    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully! I will get back to you soon.',
      data: contact 
    });
  } catch (error) {
    console.error('❌ Contact save error:', error.message);
    res.status(500).json({ error: 'Failed to send message. Please try again.', detail: error.message });
  }
});

// GET /api/contact - Get all messages (admin)
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;
