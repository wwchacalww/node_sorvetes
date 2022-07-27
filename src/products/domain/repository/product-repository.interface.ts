import RepositoryInterface from "@seedwork/repository/repository.interface";
import { Product } from "../entity/product";

export interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {
  findByName(name: string): Promise<Product[] | undefined>;
  findByBarcode(barcode: string): Promise<Product | undefined>;
  findByCode(code: string): Promise<Product | undefined>;
}
