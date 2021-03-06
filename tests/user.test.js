const { connectDb, disconnectDb } = require("../src/db");
const userRepository = require("../src/repositories/userRepository");
const dotenv = require("dotenv");
const path = require("path");
const { faker } = require("@faker-js/faker");
const { ValidationError } = require("apollo-server-errors");

describe("Tests for user", function () {
  beforeAll(() => {
    dotenv.config({ path: path.resolve(__dirname, "../.env.example") });
    connectDb();
  });

  afterAll(() => {
    disconnectDb();
  });

  describe("create", function () {
    it("creates a user correctly", async function () {
      const user = {
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        note: faker.lorem.lines(),
      };
      const result = await userRepository.createUser({ user });
      expect(result).toMatchObject(user);
    });

    it("throws an error when user does not have lastName", async function () {
      const user = {
        firstName: faker.name.findName(),
        note: faker.lorem.lines(),
      };
      await expect(userRepository.createUser({ user })).rejects.toThrow(
        "User validation failed: lastName: Path `lastName` is required."
      );
    });

    it("throws an error when user does not have firstName", async function () {
      const user = {
        lastName: faker.name.findName(),
        note: faker.lorem.lines(),
      };
      await expect(userRepository.createUser({ user })).rejects.toThrow(
        "User validation failed: firstName: Path `firstName` is required."
      );
    });
  });

  describe("get", function () {
    it("get a user correctly by id", async function () {
      const user = {
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        note: faker.lorem.lines(),
      };
      const userCreated = await userRepository.createUser({ user });
      const result = await userRepository.getUser({ id: userCreated._id });
      expect(result).toMatchObject(user);
    });
  });

  describe("update", function () {
    it("updates a user correctly", async function () {
      const user = {
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        note: faker.lorem.lines(),
      };
      const userCreated = await userRepository.createUser({ user });
      const userUpdated = {
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        note: faker.lorem.lines(),
      };
      const result = await userRepository.updateUser({
        id: userCreated._id,
        user: userUpdated,
      });
      expect(result).toMatchObject(userUpdated);
    });

    it("updates a user correctly, ignoring null values", async function () {
      const user = {
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        note: faker.lorem.lines(),
      };
      const userCreated = await userRepository.createUser({ user });
      const userUpdated = {
        firstName: faker.name.findName(),
        note: faker.lorem.lines(),
      };
      const result = await userRepository.updateUser({
        id: userCreated._id,
        user: userUpdated,
      });
      expect(result).toMatchObject({
        firstName: userUpdated.firstName,
        lastName: userCreated.lastName,
        note: userUpdated.note,
      });
    });
  });

  describe("delete", function () {
    it("deletes a user correctly", async function () {
      const user = {
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        note: faker.lorem.lines(),
      };
      const userCreated = await userRepository.createUser({ user });
      const result = await userRepository.deleteUser({ id: userCreated._id });
      expect(result).toMatchObject(user);
      const findUser = await userRepository.getUser({ id: userCreated._id });
      expect(findUser).toBeNull();
    });

    it("executes delete a user twice correctly", async function () {
      const user = {
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        note: faker.lorem.lines(),
      };
      const userCreated = await userRepository.createUser({ user });
      let result = await userRepository.deleteUser({ id: userCreated._id });
      result = await userRepository.deleteUser({ id: userCreated._id });
      expect(result).toBeNull();
    });
  });
});
