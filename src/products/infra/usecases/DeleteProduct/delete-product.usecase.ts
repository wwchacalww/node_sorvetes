import { ProductRepositoryInterface } from "products/domain/repository/product-repository.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteProductUseCase {
  constructor(
    @inject("ProductRepository")
    private productRepository: ProductRepositoryInterface
  ) {}

  async execute(id: string): Promise<string> {
    await this.productRepository.delete(id);
    return "oi";
  }
}
