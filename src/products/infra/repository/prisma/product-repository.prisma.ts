import { prisma } from "../../../../infra/db/prisma";
import { Product } from "products/domain/entity/product";
import { ProductRepositoryInterface } from "products/domain/repository/product-repository.interface";
import NotificationError from "@seedwork/notification/notification.error";

export class ProductRepository implements ProductRepositoryInterface {
  async findByName(name: string): Promise<Product[] | undefined> {
    const result = await prisma.products.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });

    if (result) {
      return result.map((product) => new Product(product));
    }

    return undefined;
  }

  async findByBarcode(barcode: string): Promise<Product> {
    const result = await prisma.products.findUnique({
      where: {
        barcode,
      },
    });

    if (!result) {
      throw new NotificationError([
        { context: "FindProductDB", message: "Product not found" },
      ]);
    }
    return new Product(result);
  }

  async findByCode(code: string): Promise<Product> {
    const result = await prisma.products.findUnique({
      where: {
        code,
      },
    });

    if (!result) {
      throw new NotificationError([
        { context: "FindProductDB", message: "Product not found" },
      ]);
    }
    return new Product(result);
  }

  async create(entity: Product): Promise<Product> {
    const { id, name, description, category, code, barcode, isActive } = entity;

    const productExists = await prisma.products.findFirst({
      where: {
        code,
        name,
        barcode,
      },
    });
    if (productExists) {
      throw new NotificationError([
        { context: "CreateProductDB", message: "Product already exists" },
      ]);
    }

    await prisma.products.create({
      data: {
        id,
        name,
        description,
        category,
        code,
        barcode,
        isActive,
      },
    });

    return entity;
  }

  async update(entity: Product): Promise<Product> {
    const { id, name, description, category, code, barcode, isActive } = entity;
    await prisma.products.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        category,
        code,
        barcode,
        isActive,
      },
    });
    return entity;
  }

  async delete(id: string): Promise<void> {
    const result = await prisma.products.delete({ where: { id } });
    console.log(result);
  }

  async findById(id: string): Promise<Product> {
    const result = await prisma.products.findUnique({
      where: {
        id,
      },
    });

    if (!result) {
      throw new NotificationError([
        { context: "FindProductDB", message: "Product not found" },
      ]);
    }

    return new Product(result);
  }

  async findAll(): Promise<Product[]> {
    const products = await prisma.products.findMany();
    return products.map((product) => new Product(product));
  }
}
