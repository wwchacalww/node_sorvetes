import NotificationError from "@seedwork/notification/notification.error";
import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";
import UserRepositoryInterface from "users/domain/repository/user-repository.interface";
import { createJWToken } from "@seedwork/services/createJWToken";

export type AuthenticateInputDTO = {
  email: string;
  password: string;
};

export type PayloadOutputDTO = {
  id: string;
  email: string;
  isAdmin: boolean;
};

@injectable()
export class AuthenticateUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepositoryInterface
  ) {}

  async execute({ email, password }: AuthenticateInputDTO) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotificationError([
        { context: "authenticate", message: "E-mail or password invalid" },
      ]);
    }

    const passwordMath = await compare(password, user.password);

    if (!passwordMath) {
      throw new NotificationError([
        { context: "authenticate", message: "E-mail or password invalid" },
      ]);
    }

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

    const refreshToken = await this.userRepository.createRefreshToken(user.id);

    return {
      token,
      refreshToken,
      permissions,
      roles,
    };
  }
}
