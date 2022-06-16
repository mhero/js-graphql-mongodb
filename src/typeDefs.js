const { gql } = require("apollo-server-express");
const {
  constraintDirective,
  constraintDirectiveTypeDefs,
} = require("graphql-constraint-directive");
const { resolvers } = require("./resolvers");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const typeDefs = gql`
  type User {
    id: ID
    firstName: String
    lastName: String
    note: String
  }

  type Query {
    hello: String
    getAllUsers: [User]
    getUser(id: ID): User
  }

  input UserInput {
    firstName: String! @constraint(minLength: 1)
    lastName: String! @constraint(minLength: 1)
    note: String
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    note: String
  }

  type Mutation {
    createUser(user: CreateUserInput): User
    deleteUser(id: ID): String
    updateUser(id: ID, user: UpdateUserInput): User
  }
`;

let schema = makeExecutableSchema({
  typeDefs: [constraintDirectiveTypeDefs, typeDefs],
  resolvers,
});
schema = constraintDirective()(schema);

module.exports = {
  schema,
};
