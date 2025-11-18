import express from 'express';
import jwt from 'jsonwebtoken';
import { protect } from '../middleware/auth.js';
import { mockDatabase } from '../data/mockData.js';

const router = express.Router();

// POST /api/admin/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { id: 'admin', role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '1d' }
      );
      return res.json({ success: true, token, user: { id: 'admin', username: process.env.ADMIN_USERNAME, role: 'admin' } });
    }
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  } catch (err) {
    console.error('Admin login error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/admin/messages
router.get('/messages', protect, async (req, res) => {
  try {
    const messages = mockDatabase.getAllMessages();
    return res.json({ success: true, data: messages });
  } catch (err) {
    console.error('Get messages error:', err);
    return res.status(500).json({ success: false, message: 'Error fetching messages' });
  }
});

// PUT /api/admin/messages/:id/read
router.put('/messages/:id/read', protect, async (req, res) => {
  try {
    const updated = mockDatabase.markAsRead(req.params.id);
    if (!updated) return res.status(404).json({ success: false, message: 'Message not found' });
    return res.json({ success: true, data: updated });
  } catch (err) {
    console.error('Mark read error:', err);
    return res.status(500).json({ success: false, message: 'Error marking message as read' });
  }
});

// DELETE /api/admin/messages/:id
router.delete('/messages/:id', protect, async (req, res) => {
  try {
    const deleted = mockDatabase.deleteMessage(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Message not found' });
    return res.json({ success: true, message: 'Message deleted successfully' });
  } catch (err) {
    console.error('Delete message error:', err);
    return res.status(500).json({ success: false, message: 'Error deleting message' });
  }
});

export default router;
