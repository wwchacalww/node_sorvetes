import { prisma } from "infra/db/prisma";
import { Price } from "products/domain/entity/price";
import { Product } from "products/domain/entity/product";
import { Item } from "stock-flow/domain/entity/item";
import { OrderItems } from "stock-flow/domain/entity/order-items";
import { OrderRepositoryInterface } from "stock-flow/domain/repository/order-repository.interface";

type CreateItemsProps = {
  id: string;
  product_id: string;
  quantity: number;
  status: string;
  price: number;
  cost: number;
  created_at: Date;
  updated_at: Date;
  order_id?: string;
}[];

export class OrderRepository implements OrderRepositoryInterface {
  async findByDay(day: Date): Promise<OrderItems | null> {
    const begin_at = day.setHours(0, 0, 0, 0);
    const end_at = day.setHours(23, 59, 59, 999);
    const orderFound = await prisma.orders.findFirst({
      where: {
        created_at: {
          gte: new Date(begin_at),
          lte: new Date(end_at),
        },
      },
      include: {
        items: {
          include: {
            Product: true,
          },
        },
      },
    });

    if (orderFound) {
      const newOrder = new OrderItems({
        id: orderFound.id,
        type: orderFound.type,
        status: orderFound.status,
        createdAt: orderFound.created_at,
        updatedAt: orderFound.updated_at,
        items: [],
      });

      orderFound.items.forEach((item) => {
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

        const itemAdd = new Item({
          id: item.id,
          product,
          quantity: item.quantity,
          status: item.status,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        });

        newOrder.addItem(itemAdd);
      });

      return newOrder;
    }
    return null;
  }

  async addItems(order: OrderItems): Promise<OrderItems> {
    const itemsMap = mapItems(order, true);
    try {
      await prisma.items.createMany({
        data: itemsMap,
        skipDuplicates: true,
      });

      await prisma.orders.update({
        where: {
          id: order.id,
        },
        data: {
          status: order.status,
          type: order.type,
          totalCost: order.totalCost,
          totalPrice: order.totalPrice,
          updated_at: new Date(),
        },
      });
    } catch (err) {
      console.log(err);
    }

    return order;
  }

  async create(entity: OrderItems): Promise<OrderItems> {
    const {
      id,
      totalCost,
      totalPrice,
      createdAt: created_at,
      updatedAt: updated_at,
      status,
      type,
    } = entity;
    const itemsMap = mapItems(entity);
    await prisma.orders.create({
      data: {
        id,
        type,
        status,
        totalCost,
        totalPrice,
        created_at,
        updated_at,
        items: {
          create: itemsMap,
        },
      },
    });
    return entity;
  }

  async update(entity: OrderItems): Promise<OrderItems> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<OrderItems> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<OrderItems[]> {
    throw new Error("Method not implemented.");
  }
}

function mapItems(order: OrderItems, withId = false): CreateItemsProps {
  return order.entitiesItems.map((item) => {
    if (withId) {
      return {
        id: item.id,
        product_id: item.product.id,
        quantity: item.quantity,
        status: item.status,
        price: item.product.value().price,
        cost: item.product.value().cost,
        created_at: item.createdAt,
        updated_at: item.updatedAt,
        orders_id: order.id,
      };
    } else {
      return {
        id: item.id,
        product_id: item.product.id,
        quantity: item.quantity,
        status: item.status,
        price: item.product.value().price,
        cost: item.product.value().cost,
        created_at: item.createdAt,
        updated_at: item.updatedAt,
      };
    }
  });
}
