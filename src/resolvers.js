const userRepository = require("./repositories/userRepository");

const resolvers = {
  Query: {
    hello: () => "Hello world",
    getAllUsers: async () => {
      return userRepository.getAllUsers();
    },
    async getUser(_, { id }) {
      return userRepository.getUser({ id });
    },
  },
  Mutation: {
    async createUser(_parent, { user }) {
      return userRepository.createUser({ user });
    },
    async deleteUser(_, { id }) {
      return userRepository.deleteUser({ id });
    },
    async updateUser(_, { id, user }) {
      return userRepository.updateUser({ id, user });
    },
  },
};

module.exports = {
  resolvers,
};
