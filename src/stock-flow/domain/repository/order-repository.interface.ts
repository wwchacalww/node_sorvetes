import RepositoryInterface from "@seedwork/repository/repository.interface";
import { OrderItems } from "../entity/order-items";

export interface OrderRepositoryInterface
  extends RepositoryInterface<OrderItems> {
  addItems(order: OrderItems): Promise<OrderItems>;
  findByDay(day: Date): Promise<OrderItems | null>;
}
