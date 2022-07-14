import NotificationError from "../../../../@seedwork/notification/notification.error";
import { compare } from "bcrypt";
import { Sequelize } from "sequelize-typescript";
import { User } from "../../../../users/domain/entity/user";
import UserModel from "./user-model.sequelize";
import UserRepository from "./user-repository.sequelize";

describe("User repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([UserModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should throw error when user email already exists", async () => {
    const userRepository = new UserRepository(UserModel);
    const user = new User({
      name: "User 1",
      email: "hakuna@matata.com",
      password: "123456",
      isAdmin: false,
    });
    await userRepository.create(user);

    const user2 = new User({
      name: "User 12",
      email: "hakuna@matata.com",
      password: "123456",
      isAdmin: false,
    });
    await expect(userRepository.create(user2)).rejects.toThrow(
      new NotificationError([
        { context: "createUser", message: "Email already exists" },
      ])
    );
  });

  it("should create a user", async () => {
    const userRepository = new UserRepository(UserModel);
    const user = new User({
      name: "User 1",
      email: "hakuna@matata.com",
      password: "123456",
      isAdmin: true,
    });

    await userRepository.create(user);

    const userModel = await UserModel.findOne({
      where: { email: "hakuna@matata.com" },
    });

    expect(userModel.toJSON()).toStrictEqual({
      id: user.id,
      name: "User 1",
      email: "hakuna@matata.com",
      password: userModel.password,
      isAdmin: true,
    });
  });

  it("should update password", async () => {
    const userRepository = new UserRepository(UserModel);
    const user = new User({
      name: "User 1",
      email: "hakuna@matata.com",
      password: "123456",
      isAdmin: false,
    });

    await userRepository.create(user);

    let userModel = await UserModel.findOne({ where: { id: user.id } });
    let passwordConfirmed = await compare(user.password, userModel.password);
    expect(passwordConfirmed).toBeTruthy();

    user.changePassword("654321");
    await userRepository.update(user);

    userModel = await UserModel.findOne({ where: { id: user.id } });
    passwordConfirmed = await compare("654321", userModel.password);
    expect(passwordConfirmed).toBeTruthy();
  });

  it("should find a user", async () => {
    const userRepository = new UserRepository(UserModel);
    const user = new User({
      name: "User 1",
      email: "hakuna@matata.com",
      password: "123456",
      isAdmin: false,
    });

    await userRepository.create(user);

    const userModel = await UserModel.findOne({ where: { id: user.id } });

    const foundUser = await userRepository.findById(user.id);

    expect(userModel.toJSON()).toStrictEqual({
      ...foundUser.toJSON(),
      password: userModel.password,
    });
  });

  it("should find all users", async () => {
    const userRepository = new UserRepository(UserModel);
    const user = new User({
      name: "User 1",
      email: "hakuna@matata.com",
      password: "123456",
      isAdmin: false,
    });
    await userRepository.create(user);

    const user2 = new User({
      name: "User 12",
      email: "hakuna@matata2.com",
      password: "123456",
      isAdmin: false,
    });
    await userRepository.create(user2);

    const foundusers = await userRepository.findAll();

    expect(foundusers.length).toBe(2);
  });
});
