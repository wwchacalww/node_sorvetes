import RepositoryInterface from "@seedwork/repository/repository.interface";
import { Item } from "../entity/item";
import { Stock } from "../entity/stock";

export interface StockRepositoryInterface extends RepositoryInterface<Stock> {
  addItems(stock: Stock, items: Item[]): Promise<Stock>;
  findByDay(day: Date): Promise<Stock | null>;
  updateStatus(): Promise<void>;
}
