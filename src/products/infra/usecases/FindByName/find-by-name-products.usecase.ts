import { ProductRepositoryInterface } from "../../../domain/repository/product-repository.interface";
import { inject, injectable } from "tsyringe";
import {
  FindByNameProductsInputDTO,
  ListProductsOutputDTO,
} from "../../../infra/dto";

@injectable()
export class FindByNameProductsUseCase {
  constructor(
    @inject("ProductRepository")
    private productRepository: ProductRepositoryInterface
  ) {}

  async execute(
    input: FindByNameProductsInputDTO
  ): Promise<ListProductsOutputDTO> {
    const products = await this.productRepository.findByName(input.name);
    return {
      products: products.map((product) => {
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          category: product.category,
          code: product.code,
          barcode: product.barcode,
          isActive: product.isActive,
          price: product.value() ? product.value().price : undefined,
        };
      }),
    };
  }
}
