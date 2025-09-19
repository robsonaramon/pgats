const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { verifyToken } = require('./authenticate');

async function createApp() {
  const app = express();
  app.use(express.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const auth = req.headers.authorization || '';
      const token = auth.replace('Bearer ', '');
      const decoded = verifyToken(token);
      return { user: decoded };
    }
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  return app;
}

module.exports = createApp;
