import { Product } from "products/domain/entity/product";
import { ProductRepositoryInterface } from "products/domain/repository/product-repository.interface";
import { Item } from "stock-flow/domain/entity/item";
import { OrderItems } from "stock-flow/domain/entity/order-items";
import { OrderRepositoryInterface } from "stock-flow/domain/repository/order-repository.interface";
import { CreateItemInputDTO, CreateOrderInputDTO } from "stock-flow/infra/dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateOrderUseCase {
  constructor(
    @inject("OrderRepository")
    private orderRepository: OrderRepositoryInterface,
    @inject("ProductRepository")
    private productRepository: ProductRepositoryInterface
  ) {}

  async execute(data: CreateOrderInputDTO) {
    const items = await this.mapItems(data.items);

    const order = new OrderItems({
      items,
      type: data.type,
      status: data.status,
    });

    await this.orderRepository.create(order);
    return order;
  }

  async mapItems(data: CreateItemInputDTO[]): Promise<Item[]> {
    const items = await Promise.all(
      data.map(async (item) => {
        const product = await this.productRepository.findById(item.product_id);
        return new Item({
          product,
          quantity: item.quantity,
          status: item.status,
        });
      })
    );

    return items;
  }
}
