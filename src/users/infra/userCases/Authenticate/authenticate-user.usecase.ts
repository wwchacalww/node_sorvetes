import NotificationError from "@seedwork/notification/notification.error";
import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";
import UserRepositoryInterface from "users/domain/repository/user-repository.interface";
import { sign } from "jsonwebtoken";
import "dotenv/config";

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

    const payload: PayloadOutputDTO = {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    const token = sign(payload, process.env.JWT_SECRET, {
      subject: user.email,
      expiresIn: 60 * 10, // 20 seconds
    });

    return {
      token,
    };
  }
}
