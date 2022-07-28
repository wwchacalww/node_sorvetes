import { Price } from "products/domain/entity/price";
import { PriceRepositoryInterface } from "products/domain/repository/price-repository.interface";
import {
  SetProductPriceInputDTO,
  SetProductPriceOutPutDTO,
} from "products/infra/dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class SetProductPriceUseCase {
  constructor(
    @inject("PriceRepository")
    private priceRepository: PriceRepositoryInterface
  ) {}

  public async execute({
    product_id,
    price,
    cost,
  }: SetProductPriceInputDTO): Promise<SetProductPriceOutPutDTO> {
    const entity = new Price({
      product_id,
      price,
      cost,
    });
    return await this.priceRepository.setProductPrice(entity);
  }
}
