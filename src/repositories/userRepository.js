const User = require("../models/user");

async function getAllUsers() {
  const users = await User.find();
  return users;
}

async function createUser({ user }) {
  const { firstName, lastName, note } = user;
  const newUser = new User({ firstName, lastName, note });
  await newUser.save();
  return newUser;
}

async function getUser({ id }) {
  return await User.findById(id);
}

async function deleteUser({ id }) {
  return await User.findByIdAndDelete(id);
}

async function updateUser({ id, user }) {
  const { firstName, lastName, note } = user;
  const newUser = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        firstName,
        lastName,
        note,
      },
    },
    {
      new: true,
      omitUndefined: true,
    }
  );
  return newUser;
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
