const bcrypt = require('bcryptjs');

async function test() {
  try {
    const salt = await bcrypt.genSalt(10);
    console.log('Salt:', salt);
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
