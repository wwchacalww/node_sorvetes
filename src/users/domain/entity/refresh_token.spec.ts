import { RefreshToken } from "./refresh_token";
import { User } from "./user";

describe("Entity Refresh Token unit test", () => {
  test("create refresh token", () => {
    const user = new User({
      name: "User 1",
      email: "user@user.com",
      password: "123456",
      isAdmin: false,
    });

    const refreshToken = new RefreshToken({ user });
    expect(refreshToken.token).toBeDefined();
  });
});
