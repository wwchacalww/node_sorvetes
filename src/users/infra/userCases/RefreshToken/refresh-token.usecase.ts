import NotificationError from "@seedwork/notification/notification.error";
import { createJWToken } from "@seedwork/services/createJWToken";
import { inject, injectable } from "tsyringe";
import UserRepositoryInterface from "../../../domain/repository/user-repository.interface";

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepositoryInterface
  ) {}

  async execute(user_id: string, refresh_token: string) {
    const checkRefreshTokenIsValid =
      await this.userRepository.checkRefreshTokenIsValid(
        user_id,
        refresh_token
      );
    if (!checkRefreshTokenIsValid) {
      throw new NotificationError([
        { context: "refresh_token", message: "Invalid refresh token" },
      ]);
    }

    const user = await this.userRepository.findById(user_id);

    await this.userRepository.invalidateRefreshToken(refresh_token);

    const refreshToken = await this.userRepository.createRefreshToken(user_id);

    const permissions = user.isAdmin
      ? ["users.list", "users.create"]
      : ["user"];
    const roles = user.isAdmin ? ["administrator"] : [];
    const tokenInput = {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      permissions,
      roles,
    };
    const token = createJWToken(tokenInput);

    return {
      token,
      refreshToken,
      permissions,
      roles,
    };
  }
}
