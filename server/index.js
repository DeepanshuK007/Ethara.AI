require('dotenv').config();
process.env.MONGOMS_VERSION = '7.0.3';

// Polyfill for Node 18 to support global crypto (used by Mongoose/MongoDB)
const crypto = require('crypto');
if (!global.crypto) {
  global.crypto = crypto.webcrypto;
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Team Task Manager API is running...');
});

// Start the server immediately so that deployment health checks pass
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Database Connection in the background
const MONGO_URI = process.env.MONGO_URI || process.env.MONGO_URL || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/team-task-manager';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully.');
  })
  .catch(async (err) => {
    if (MONGO_URI.includes('<username>')) {
      console.error('❌ Cloud MongoDB connection failed: Please update your server/.env file with your actual MongoDB Atlas credentials.');
    } else {
      console.error('❌ MongoDB connection failed:', err.message);
    }
    
    if (process.env.NODE_ENV === 'production') {
      console.error('❌ In production mode, a valid MONGO_URI is required in your environment variables to ensure persistence.');
      console.log('⚠️ Server execution is continuing without a working database.');
      return;
    }
    
    console.warn('⚠️ Attempting In-Memory Database fallback so the server can start with fallback DB...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      await mongoose.connect(uri);
      console.log('✅ Connected to In-Memory MongoDB for testing');
    } catch (inMemErr) {
      console.error('❌ In-Memory Database fallback failed to start:', inMemErr.message);
    }
  });
