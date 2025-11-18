import express from 'express';

const router = express.Router();

// Messaging API removed
router.use((req, res) => {
  res.status(410).json({
    success: false,
    message: 'Messaging API has been removed from this application.'
  });
});

export default router;
