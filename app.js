// app.js
const express = require('express');
const userController = require('./controller/userController');
const transferController = require('./controller/transferController');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const authenticateToken = require('./middleware/authMiddleware');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Rotas de usuário
app.post('/register', userController.register);
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
  }
  const user = userController.loginUser(username, password);
  if (!user) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }
  const SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';
  const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});
app.get('/users', userController.list);
app.post('/users/:username/favorecidos', userController.addFavorecido);

// Rotas de transferência protegidas
app.post('/transfer', authenticateToken, transferController.transfer);
app.get('/transfers', authenticateToken, transferController.list);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
