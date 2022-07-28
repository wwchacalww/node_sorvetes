import { container } from "tsyringe";
import { UserRepository } from "../../users/infra/repository/prisma/user-repository.prisma";
import UserRepositoryInterface from "../../users/domain/repository/user-repository.interface";
import { ProductRepositoryInterface } from "products/domain/repository/product-repository.interface";
import { ProductRepository } from "products/infra/repository/prisma/product-repository.prisma";
import { PriceRepositoryInterface } from "products/domain/repository/price-repository.interface";
import { PriceRepository } from "products/infra/repository/prisma/price-repository.prisma";

container.registerSingleton<UserRepositoryInterface>(
  "UserRepository",
  UserRepository
);

container.registerSingleton<ProductRepositoryInterface>(
  "ProductRepository",
  ProductRepository
);

container.registerSingleton<PriceRepositoryInterface>(
  "PriceRepository",
  PriceRepository
);
