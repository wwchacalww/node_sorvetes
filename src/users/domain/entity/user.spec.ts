import { User } from "./user";

describe("User entity unit test", () => {
  it("should create a new user", async () => {
    const user = new User({
      name: "Fulando de Tal",
      email: "fulando@detal.com",
      password: "123456",
      isAdmin: true,
    });

    expect(user.name).toBe("Fulando de Tal");
    expect(user.email).toBe("fulando@detal.com");
    expect(user.id).toBeDefined();

    user.changePassword("asdqwe");
    expect(user.password).toBe("asdqwe");
  });

  it("should throw an error when creating a new user with invalid props", async () => {
    expect(() => {
      new User({} as any);
    }).toThrowError(
      "User: User name is required, User: User email is required, User: User password is required"
    );
    expect(() => {
      new User({
        name: "Fu",
        email: "fu",
        password: "",
        isAdmin: false,
      });
    }).toThrowError(
      "User: User name must be at least 3 characters, User: email must be a valid email, User: User password is required, User: User password must be at least 6 characters"
    );
  });
});
