// Suppress all console output temporarily
const originalConsoleLog = console.log;
console.log = () => {};

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';

// Load env vars
dotenv.config();

// Restore console.log
console.log = originalConsoleLog;

// Server configuration
const SERVER_NAME = process.env.SERVER_NAME || 'CyberAdmin';
const PORT = process.env.PORT || 5000;

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Using mock database for admin functionality

// Import routes
import messageRoutes from './routes/messages.js';
import contactRoutes from './routes/contact.js';

// Mount routes
app.use('/api/messages', messageRoutes);
app.use('/api/contact', contactRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
