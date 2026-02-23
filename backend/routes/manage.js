const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const adminAuth = require('../middleware/adminAuth');

// All routes require admin password
router.use(adminAuth);

// GET /api/manage/messages - Get all contact messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch messages' });
  }
});

// PATCH /api/manage/messages/:id/read - Mark message as read
router.patch('/messages/:id/read', async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!message) return res.status(404).json({ success: false, error: 'Message not found' });
    res.json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update message' });
  }
});

// PATCH /api/manage/messages/:id/unread - Mark message as unread
router.patch('/messages/:id/unread', async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: false },
      { new: true }
    );
    if (!message) return res.status(404).json({ success: false, error: 'Message not found' });
    res.json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update message' });
  }
});

// DELETE /api/manage/messages/:id - Delete a message
router.delete('/messages/:id', async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ success: false, error: 'Message not found' });
    res.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete message' });
  }
});

module.exports = router;
