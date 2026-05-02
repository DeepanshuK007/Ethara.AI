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

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGO_URL || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/team-task-manager';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(async (err) => {
    console.warn('⚠️ Local MongoDB connection failed. Attempting In-Memory Database fallback...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      await mongoose.connect(uri);
      console.log('✅ Connected to In-Memory MongoDB for testing');
    } catch (inMemErr) {
      console.error('❌ In-Memory Database fallback failed to start:', inMemErr.message);
      console.log('⚠️ Continuing server execution without DB for demo and routing purposes.');
    }
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  });
