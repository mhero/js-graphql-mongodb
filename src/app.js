const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { schema } = require("./typeDefs");
const { connectDb } = require("./db");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
connectDb();

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

async function start() {
  const apolloServer = new ApolloServer({
    schema,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/api" });

  app.use((req, res, next) => {
    res.status(404).send("not found");
  });

  app.listen(process.env.API_PORT, () =>
    console.log("Server started on port", process.env.API_PORT)
  );
}

start();
