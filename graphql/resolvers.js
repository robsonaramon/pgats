const userService = require('../service/userService');
const transferService = require('../service/transferService');
const { generateToken } = require('./authenticate');

const resolvers = {
  Query: {
    me: (parent, args, context) => {
      const { user } = context;
      if (!user) return null;
      return userService.findUserByUsername(user.username);
    },
    users: () => userService.listUsers(),
    transfers: () => transferService.listTransfers()
  },
  Mutation: {
    register: (parent, { input }) => {
      const user = userService.registerUser(input);
      return { username: user.username, favorecidos: user.favorecidos, saldo: user.saldo };
    },
    login: (parent, { input }) => {
      const user = userService.authenticateUser(input.username, input.password);
      if (!user) throw new Error('Credenciais inválidas');
      const token = generateToken(user);
      return { token, user: { username: user.username, favorecidos: user.favorecidos, saldo: user.saldo } };
    },
    transfer: (parent, { input }, context) => {
      // Require auth
      if (!context.user) {
        throw new Error('Unauthorized');
      }
      // perform transfer using service
      const result = transferService.transfer(input);
      // ensure date is ISO string
      return { ...result, data: result.data.toISOString() };
    },
    addFavorecido: (parent, { username, favorecido }) => {
      const user = userService.addFavorecido(username, favorecido);
      return { username: user.username, favorecidos: user.favorecidos, saldo: user.saldo };
    }
  }
};

module.exports = resolvers;
