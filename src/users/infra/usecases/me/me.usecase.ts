import NotificationError from "@seedwork/notification/notification.error";
import { inject, injectable } from "tsyringe";
import UserRepositoryInterface from "../../../domain/repository/user-repository.interface";

type MeOutput = {
  email: string;
  permissions: string[];
  roles: string[];
};

@injectable()
export class MeUsecase {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepositoryInterface
  ) {}

  async execute(user_id: string): Promise<MeOutput> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new NotificationError([
        { context: "user", message: "User not found" },
      ]);
    }

    const permissions = user.isAdmin
      ? ["users.list", "users.create"]
      : ["user"];
    const roles = user.isAdmin ? ["administrator"] : [];

    return {
      email: user.email,
      permissions,
      roles,
    };
  }
}
