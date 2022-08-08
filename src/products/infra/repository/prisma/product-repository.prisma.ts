import { prisma } from "../../../../infra/db/prisma";
import { Product } from "products/domain/entity/product";
import { ProductRepositoryInterface } from "products/domain/repository/product-repository.interface";
import NotificationError from "@seedwork/notification/notification.error";
import { Price } from "products/domain/entity/price";

export class ProductRepository implements ProductRepositoryInterface {
  async findByName(name: string): Promise<Product[] | undefined> {
    const result = await prisma.products.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      include: {
        Prices: true,
      },
    });

    if (!result) {
      return undefined;
    }

    return result.map((product) => {
      const productEntity = new Product(product);
      product.Prices.forEach((price) => {
        productEntity.addPrice(new Price(price));
      });
      return productEntity;
    });
  }

  async findByBarcode(barcode: string): Promise<Product> {
    const result = await prisma.products.findUnique({
      where: {
        barcode,
      },
      include: {
        Prices: true,
      },
    });

    if (!result) {
      throw new NotificationError([
        { context: "FindProductDB", message: "Product not found" },
      ]);
    }
    const product = new Product(result);

    result.Prices.forEach((price) => {
      product.addPrice(new Price(price));
    });

    return product;
  }

  async findByCode(code: string): Promise<Product> {
    const result = await prisma.products.findUnique({
      where: {
        code,
      },
      include: {
        Prices: true,
      },
    });

    if (!result) {
      throw new NotificationError([
        { context: "FindProductDB", message: "Product not found" },
      ]);
    }

    const product = new Product(result);

    result.Prices.forEach((price) => {
      product.addPrice(new Price(price));
    });

    return product;
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
  }

  async findById(id: string): Promise<Product> {
    const result = await prisma.products.findUnique({
      where: {
        id,
      },
      include: {
        Prices: true,
      },
    });

    if (!result) {
      throw new NotificationError([
        { context: "FindProductDB", message: "Product not found" },
      ]);
    }

    const product = new Product(result);

    result.Prices.forEach((price) => {
      product.addPrice(new Price(price));
    });

    return product;
  }

  async findAll(): Promise<Product[]> {
    const products = await prisma.products.findMany({
      include: {
        Prices: true,
      },
    });
    return products.map((product) => {
      const productEntity = new Product(product);
      product.Prices.forEach((price) => {
        productEntity.addPrice(new Price(price));
      });
      return productEntity;
    });
  }
}
