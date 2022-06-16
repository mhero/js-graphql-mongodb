const { connect, disconnect } = require("mongoose");

const connectDb = async () => {
  try {
    await connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error(error);
  }
};

const disconnectDb = async () => {
  try {
    await disconnect();
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connectDb, disconnectDb };
