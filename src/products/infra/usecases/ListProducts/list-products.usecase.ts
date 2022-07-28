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
    const products = await this.productRepository.findAll();
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
