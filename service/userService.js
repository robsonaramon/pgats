// userService.js
const { users } = require('../model/userModel');
const bcrypt = require('bcryptjs');

function findUserByUsername(username) {
  return users.find(u => u.username === username);
}

function registerUser({ username, password, favorecidos = [] }) {
  if (findUserByUsername(username)) {
    throw new Error('Usuário já existe');
  }
  const hashedPassword = bcrypt.hashSync(password, 8);
  const user = { username, password: hashedPassword, favorecidos, saldo: 10000 };
  users.push(user);
  return user;
}

function authenticateUser(username, password) {
  const user = findUserByUsername(username);
  if (!user) return null;
  const valid = bcrypt.compareSync(password, user.password);
  return valid ? user : null;
}

function listUsers() {
  return users.map(u => ({ username: u.username, favorecidos: u.favorecidos, saldo: u.saldo }));
}

function addFavorecido(username, favorecido) {
  const user = findUserByUsername(username);
  if (!user) throw new Error('Usuário não encontrado');
  if (!user.favorecidos.includes(favorecido)) {
    user.favorecidos.push(favorecido);
  }
  return user;
}

module.exports = {
  findUserByUsername,
  registerUser,
  authenticateUser,
  listUsers,
  addFavorecido
};
