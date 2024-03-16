const express = require('express');
const path = require('path');
// Import ApolloServer
const { ApolloServer } = require("apollo-server-express");
// Middleware for authentication
const { authMiddleware } = require("./utils/auth");
// Import typeDefs and resolvers from schema
const { typeDefs, resolvers } = require("./schemas");
const db = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;

// Create a Apollo server and pass in schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Context used for token authentication
  context: authMiddleware,
});

// Integrate Apollo server with Express application as middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
