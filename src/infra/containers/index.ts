import { container } from "tsyringe";
import { UserRepository } from "../../users/infra/repository/prisma/user-repository.prisma";
import UserRepositoryInterface from "../../users/domain/repository/user-repository.interface";
import { ProductRepositoryInterface } from "products/domain/repository/product-repository.interface";
import { ProductRepository } from "products/infra/repository/prisma/product-repository.prisma";
import { PriceRepositoryInterface } from "products/domain/repository/price-repository.interface";
import { PriceRepository } from "products/infra/repository/prisma/price-repository.prisma";
import { OrderRepository } from "../../stock-flow/infra/repository/order.repository";
import { OrderRepositoryInterface } from "stock-flow/domain/repository/order-repository.interface";
import { StockRepositoryInterface } from "stock-flow/domain/repository/stock-repository.interface";
import { StockRepository } from "stock-flow/infra/repository/stock.repository";

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

container.registerSingleton<OrderRepositoryInterface>(
  "OrderRepository",
  OrderRepository
);

container.registerSingleton<StockRepositoryInterface>(
  "StockRepository",
  StockRepository
);
