const jwt = require('jsonwebtoken');
const { loginUser } = require('../controller/userController');

const SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';

function generateToken(user) {
  const payload = { username: user.username };
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}

function verifyToken(token) {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded;
  } catch (e) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
  SECRET
};
