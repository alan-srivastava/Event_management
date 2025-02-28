import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import http from 'http';
import eventRoutes from './routes/events.js';
import userRoutes from './routes/users.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  
  app.use(express.static(join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../dist/index.html'));
  });
}

// Function to find an available port using ES modules
const findAvailablePort = (startPort) => {
  return new Promise((resolve) => {
    const server = http.createServer();
    
    server.listen(startPort, () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });
    
    server.on('error', () => {
      // Port is in use, try the next one
      resolve(findAvailablePort(startPort + 1));
    });
  });
};

// Start server with port fallback
findAvailablePort(PORT).then(availablePort => {
  app.listen(availablePort, () => {
    console.log(`Server running on port ${availablePort}`);
    if (availablePort !== PORT) {
      console.log(`Note: Original port ${PORT} was in use, using port ${availablePort} instead`);
      console.log(`Update your VITE_API_URL in .env to http://localhost:${availablePort}/api if needed`);
    }
  });
});