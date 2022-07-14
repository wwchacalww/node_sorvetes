import { compare } from "bcrypt";
import { User } from "./user";

describe("User entity unit test", () => {
  it("should create a new user", async () => {
    const user = await User.create({
      name: "Fulando de Tal",
      email: "fulando@detal.com",
      password: "123456",
    });

    expect(user.name).toBe("Fulando de Tal");
    expect(user.email).toBe("fulando@detal.com");
    expect(await compare("123456", user.password)).toBeTruthy();
    expect(user.id).toBeDefined();

    await user.changePassword("asdqwe");
    expect(await compare("asdqwe", user.password)).toBeTruthy();
  });
});
