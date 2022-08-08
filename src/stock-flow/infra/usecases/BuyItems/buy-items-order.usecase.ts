import { ProductRepositoryInterface } from "products/domain/repository/product-repository.interface";
import { Item } from "stock-flow/domain/entity/item";
import { OrderItems } from "stock-flow/domain/entity/order-items";
import { Stock } from "stock-flow/domain/entity/stock";
import { OrderRepositoryInterface } from "stock-flow/domain/repository/order-repository.interface";
import { StockRepositoryInterface } from "stock-flow/domain/repository/stock-repository.interface";
import { CreateItemInputDTO, CreateOrderInputDTO } from "stock-flow/infra/dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class BuyItemOrderUseCase {
  constructor(
    @inject("OrderRepository")
    private orderRepository: OrderRepositoryInterface,
    @inject("ProductRepository")
    private productRepository: ProductRepositoryInterface,
    @inject("StockRepository")
    private stockRepository: StockRepositoryInterface
  ) {}

  async execute(data: CreateOrderInputDTO) {
    const orderExists = await this.orderRepository.findByDay(new Date());
    const stockExists = await this.stockRepository.findByDay(new Date());
    await this.stockRepository.updateStatus();

    const items = await this.mapItems(data.items);
    if (orderExists && stockExists) {
      items.forEach((item) => {
        stockExists.addItem(item);
        orderExists.addItem(item);
      });
      await this.orderRepository.addItems(orderExists);
      await this.stockRepository.addItems(stockExists, items);
      return new OrderItems({
        items,
        type: "compra",
        status: "fechado",
      });
    } else {
      const order = new OrderItems({
        items,
        type: "compra",
        status: "fechado",
      });

      await this.orderRepository.create(order);
      const stock = new Stock({
        items,
      });

      await this.stockRepository.create(stock);

      return order;
    }
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
