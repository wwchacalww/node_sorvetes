import { Product } from "products/domain/entity/product";
import { ProductRepositoryInterface } from "products/domain/repository/product-repository.interface";
import { ListProductsOutputDTO } from "products/infra/dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListProductsUseCase {
  constructor(
    @inject("ProductRepository")
    private productRepository: ProductRepositoryInterface
  ) {}
  async execute(): Promise<ListProductsOutputDTO> {
    return {
      products: await this.productRepository.findAll(),
    };
  }
}
