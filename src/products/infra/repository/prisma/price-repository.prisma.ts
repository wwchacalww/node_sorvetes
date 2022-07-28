import NotificationError from "@seedwork/notification/notification.error";
import { SetProductPriceOutPutDTO } from "products/infra/dto";
import { prisma } from "../../../../infra/db/prisma";
import { Price } from "../../../domain/entity/price";
import { PriceRepositoryInterface } from "../../../domain/repository/price-repository.interface";

export class PriceRepository implements PriceRepositoryInterface {
  create(entity: Price): Promise<Price> {
    throw new Error("Method not implemented.");
  }
  update(entity: Price): Promise<Price> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Price> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Price[]> {
    throw new Error("Method not implemented.");
  }
  async setProductPrice(entity: Price): Promise<SetProductPriceOutPutDTO> {
    const { id, price, cost, createdAt: created_at, product_id } = entity;
    const productExists = await prisma.products.findUnique({
      where: {
        id: product_id,
      },
    });
    if (!productExists) {
      throw new NotificationError([
        { context: "SetPriceDB", message: "Product not found" },
      ]);
    }

    const result = await prisma.prices.create({
      data: {
        id,
        price,
        cost,
        created_at,
        product_id,
      },
      include: {
        Product: true,
      },
    });

    return {
      id: result.id,
      price: result.price,
      cost: result.cost,
      createdAt: result.created_at,
      Product: {
        id: result.Product.id,
        name: result.Product.name,
        description: result.Product.description,
        category: result.Product.category,
        code: result.Product.code,
        barcode: result.Product.barcode,
      },
    };
  }
}
