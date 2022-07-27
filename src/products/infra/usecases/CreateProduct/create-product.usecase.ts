import { ProductRepositoryInterface } from "../../../domain/repository/product-repository.interface";
import { inject, injectable } from "tsyringe";
import {
  CreateProductInputDTO,
  CreateProductOutputDTO,
} from "products/infra/dto";
import { Product } from "products/domain/entity/product";

@injectable()
export class CreateProductUseCase {
  constructor(
    @inject("ProductRepository")
    private productRepository: ProductRepositoryInterface
  ) {}

  public async execute(
    data: CreateProductInputDTO
  ): Promise<CreateProductOutputDTO> {
    const entity = new Product(data);
    const product = await this.productRepository.create(entity);
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
