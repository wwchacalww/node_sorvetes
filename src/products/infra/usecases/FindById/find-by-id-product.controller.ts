import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindByIdProductUseCase } from "./find-by-id-product.usecase";

export class FindByIdProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findById = container.resolve(FindByIdProductUseCase);
    const { id } = request.params;
    try {
      const product = await findById.execute(id.toString());
      return response.status(200).json(product);
    } catch (err: any) {
      return response.status(400).json(err.errors);
    }
  }
}
