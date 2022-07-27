import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateProductUseCase } from "./update-product.usecase";

export class UpdateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateProduct = container.resolve(UpdateProductUseCase);
    const { id, name, description, category, code, barcode, isActive } =
      request.body;

    try {
      const product = await updateProduct.execute({
        id,
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
