import { prisma } from "infra/db/prisma";
import { Price } from "products/domain/entity/price";
import { Product } from "products/domain/entity/product";
import { Item } from "stock-flow/domain/entity/item";
import { Stock } from "stock-flow/domain/entity/stock";
import { StockRepositoryInterface } from "stock-flow/domain/repository/stock-repository.interface";

type CreateItemsProps = {
  id: string;
  product_id: string;
  quantity: number;
  status: string;
  price: number;
  cost: number;
  created_at: Date;
  updated_at: Date;
}[];

export class StockRepository implements StockRepositoryInterface {
  async updateStatus(): Promise<void> {
    const date = new Date();
    const yesterday = new Date();
    yesterday.setDate(date.getDate() - 1);
    yesterday.setUTCHours(23, 59, 59, 999);
    await prisma.stock.updateMany({
      where: {
        created_at: {
          lte: yesterday,
        },
      },
      data: {
        status: "Fechado",
      },
    });
  }

  async findByDay(day: Date): Promise<Stock | null> {
    const begin_at = day.setHours(0, 0, 0, 0);
    const end_at = day.setHours(23, 59, 59, 999);

    const stockFound = await prisma.stock.findFirst({
      where: {
        created_at: {
          gte: new Date(begin_at),
          lte: new Date(end_at),
        },
      },
      include: {
        Items: {
          include: {
            Product: true,
          },
        },
      },
    });

    if (stockFound) {
      const items = stockFound.Items.map((item) => {
        const product = new Product({
          id: item.Product.id,
          name: item.Product.name,
          description: item.Product.description,
          category: item.Product.category,
          barcode: item.Product.barcode,
          code: item.Product.code,
          isActive: item.Product.isActive,
        });

        const value = new Price({
          cost: item.cost,
          price: item.price,
          product_id: product.id,
          created_at: item.created_at,
        });

        product.addPrice(value);

        return new Item({
          id: item.id,
          product,
          quantity: item.quantity,
          status: item.status,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        });
      });

      return new Stock({
        id: stockFound.id,
        createdAt: stockFound.created_at,
        items,
      });
    }
    return null;
  }

  async addItems(stock: Stock): Promise<Stock> {
    try {
      const { id, items, totalCost: cost, totalPrice: price } = stock;
      const itemsMap = mapItemsIds(stock);
      await prisma.stock.update({
        where: { id: stock.id },
        data: {
          cost,
          price,
          status: "Aberto",
          Items: {
            connect: itemsMap,
          },
          quantity: itemsMap.length,
          updated_at: new Date(),
        },
      });
    } catch (err) {
      console.log(err);
    }
    // const itemsMap = mapItemsIds(stock);
    // try {
    //   await prisma.stock.update({
    //     where: {
    //       id: stock.id,
    //     },
    //     data: {
    //       status: order.status,
    //       type: order.type,
    //       totalCost: order.totalCost,
    //       totalPrice: order.totalPrice,
    //       updated_at: new Date(),
    //     },
    //   });
    // } catch (err) {
    //   console.log(err);
    // }

    return stock;
  }

  async create(entity: Stock): Promise<Stock> {
    const {
      id,
      totalPrice: price,
      totalCost: cost,
      createdAt: created_at,
    } = entity;
    const itemsMap = mapItemsIds(entity);
    const stockCreated = await prisma.stock.create({
      data: {
        id,
        cost,
        price,
        created_at,
        status: "Aberto",
        Items: {
          connect: itemsMap,
        },
        quantity: itemsMap.length,
        updated_at: new Date(),
      },
    });
    return entity;
  }

  async update(entity: Stock): Promise<Stock> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Stock> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Stock[]> {
    throw new Error("Method not implemented.");
  }
}

function mapItemsIds(stock: Stock) {
  return stock.items.map((item) => ({
    id: item.id,
  }));
}
