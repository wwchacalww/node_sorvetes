import { container } from "tsyringe";
import { UserRepository } from "../../users/infra/repository/prisma/user-repository.prisma";
import UserRepositoryInterface from "../../users/domain/repository/user-repository.interface";
import { ProductRepositoryInterface } from "products/domain/repository/product-repository.interface";
import { ProductRepository } from "products/infra/repository/prisma/product-repository.prisma";

container.registerSingleton<UserRepositoryInterface>(
  "UserRepository",
  UserRepository
);

container.registerSingleton<ProductRepositoryInterface>(
  "ProductRepository",
  ProductRepository
);
