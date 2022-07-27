import { ProductRepositoryInterface } from "products/domain/repository/product-repository.interface";
import { inject, injectable } from "tsyringe";
import { UpdateProductInputDTO, CreateProductOutputDTO } from "../../dto";

@injectable()
export class UpdateProductUseCase {
  constructor(
    @inject("ProductRepository")
    private productRepository: ProductRepositoryInterface
  ) {}

  async execute(data: UpdateProductInputDTO): Promise<CreateProductOutputDTO> {
    const { id, name, description, category, code, barcode, isActive } = data;
    const product = await this.productRepository.findById(id);

    product.update({
      name,
      description,
      category,
      code,
      barcode,
      isActive,
    });

    const result = await this.productRepository.update(product);

    return {
      id: result.id,
      name: result.name,
      description: result.description,
      category: result.category,
      code: result.code,
      barcode: result.barcode,
      isActive: result.isActive,
    };
  }
}
