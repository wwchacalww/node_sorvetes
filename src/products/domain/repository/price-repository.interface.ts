import RepositoryInterface from "@seedwork/repository/repository.interface";
import { Price } from "../entity/price";

interface SetProductPriceOutPutDTO {
  id: string;
  price: number;
  cost: number;
  createdAt: Date;
  Product: {
    id: string;
    name: string;
    description: string;
    category: string;
    code: string;
    barcode: string;
  };
}
export interface PriceRepositoryInterface extends RepositoryInterface<Price> {
  setProductPrice(entity: Price): Promise<SetProductPriceOutPutDTO>;
}
