import { container } from "tsyringe";
import { UserRepository } from "../../users/infra/repository/sequelize/user-repository.sequelize";
import UserRepositoryInterface from "../../users/domain/repository/user-repository.interface";

container.registerSingleton<UserRepositoryInterface>(
  "UserRepository",
  UserRepository
);
