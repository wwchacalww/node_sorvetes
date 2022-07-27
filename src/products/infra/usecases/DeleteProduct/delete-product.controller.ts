import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteProductUseCase } from "./delete-product.usecase";

export class DeleteProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteProduct = container.resolve(DeleteProductUseCase);
    try {
      await deleteProduct.execute(id);
      return response.status(200).json({ message: "Product deletado" });
    } catch (err: any) {
      return response.status(400).json(err.errors);
    }
  }
}
