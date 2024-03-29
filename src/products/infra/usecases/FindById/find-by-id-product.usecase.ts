import { ProductRepositoryInterface } from "products/domain/repository/product-repository.interface";
import { ProductOutputDTO } from "products/infra/dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindByIdProductUseCase {
  constructor(
    @inject("ProductRepository")
    private productRepository: ProductRepositoryInterface
  ) {}

  async execute(id: string): Promise<ProductOutputDTO> {
    const product = await this.productRepository.findById(id);
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
  }
}
