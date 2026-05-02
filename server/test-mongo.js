require('dotenv').config();
const crypto = require('crypto');
if (!global.crypto) global.crypto = crypto.webcrypto;

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('./models/User');

async function run() {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  
  try {
    const user = await User.create({
      name: 'Test',
      email: 'test' + Date.now() + '@test.com',
      password: 'password123'
    });
    console.log('User created:', user._id);
  } catch (err) {
    console.error('Mongo Error:', err);
  }
  process.exit(0);
}

run();
