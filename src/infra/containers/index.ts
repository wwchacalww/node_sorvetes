import { container } from "tsyringe";
import { UserRepository } from "../../users/infra/repository/prisma/user-repository.prisma";
import UserRepositoryInterface from "../../users/domain/repository/user-repository.interface";

container.registerSingleton<UserRepositoryInterface>(
  "UserRepository",
  UserRepository
);
