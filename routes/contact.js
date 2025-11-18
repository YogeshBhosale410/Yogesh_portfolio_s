import express from 'express';
import { mockDatabase } from '../data/mockData.js';

const router = express.Router();

// Contact API removed
// router.use((req, res) => {
//   res.status(410).json({
//     success: false,
//     message: 'Contact API has been removed. Use the mailto form on the site.'
//   });
// });

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {};
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const saved = mockDatabase.addMessage({ name, email, subject, message });
    return res.status(201).json({ success: true, data: saved });
  } catch (err) {
    console.error('Contact submit error:', err);
    return res.status(500).json({ success: false, message: 'Failed to submit message' });
  }
});

export default router;
