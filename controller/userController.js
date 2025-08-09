// userController.js
const userService = require('../service/userService');

const register = (req, res) => {
  const { username, password, favorecidos } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
  }
  try {
    const user = userService.registerUser({ username, password, favorecidos });
    res.status(201).json({ username: user.username });
  } catch (e) {
    res.status(409).json({ error: e.message });
  }
};

const login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
  }
  const user = userService.authenticateUser(username, password);
  if (!user) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }
  res.json({ username: user.username });
};

const list = (req, res) => {
  res.json(userService.listUsers());
};

const addFavorecido = (req, res) => {
  const { username } = req.params;
  const { favorecido } = req.body;
  try {
    const user = userService.addFavorecido(username, favorecido);
    res.json({ favorecidos: user.favorecidos });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

module.exports = {
  register,
  login,
  list,
  addFavorecido
};
