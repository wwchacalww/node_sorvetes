import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindByNameProductsUseCase } from "./find-by-name-products.usecase";

export class FindByNameProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;
    const findByNameProducts = container.resolve(FindByNameProductsUseCase);

    try {
      const products = await findByNameProducts.execute({
        name: name.toString(),
      });
      return response.status(200).json(products);
    } catch (err: any) {
      return response.status(400).json(err.errors);
    }
  }
}
