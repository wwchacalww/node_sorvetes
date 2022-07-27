import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateProductUseCase } from "./create-product.usecase";

export class CreateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, category, code, barcode, isActive } =
      request.body;
    const createProduct = container.resolve(CreateProductUseCase);

    try {
      const product = await createProduct.execute({
        name,
        description,
        category,
        code,
        barcode,
        isActive,
      });

      return response.status(201).json(product);
    } catch (err: any) {
      return response.status(400).json(err.errors);
    }
  }
}
