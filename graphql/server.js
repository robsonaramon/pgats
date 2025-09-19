const createApp = require('./app');

const PORT = process.env.PORT || 4000;

createApp().then(app => {
  app.listen(PORT, () => {
    console.log(`GraphQL server running at http://localhost:${PORT}/graphql`);
  });
}).catch(err => {
  console.error('Failed to start GraphQL server', err);
});
