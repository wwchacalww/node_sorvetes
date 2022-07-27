import { ProductRepositoryInterface } from "products/domain/repository/product-repository.interface";
import { CreateProductOutputDTO } from "products/infra/dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindByCodeProductUseCase {
  constructor(
    @inject("ProductRepository")
    private productRepository: ProductRepositoryInterface
  ) {}

  async execute(code: string): Promise<CreateProductOutputDTO> {
    const product = await this.productRepository.findByCode(code);
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      code: product.code,
      barcode: product.barcode,
      isActive: product.isActive,
    };
  }
}
