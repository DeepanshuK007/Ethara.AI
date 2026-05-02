const jwt = require('jsonwebtoken');

try {
  const token = jwt.sign({ id: '123' }, 'secret', { expiresIn: '30d' });
  console.log('Token:', token);
} catch (err) {
  console.error('JWT Error:', err);
}
