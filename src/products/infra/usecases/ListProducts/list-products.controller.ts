import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListProductsUseCase } from "./list-products.usecase";

export class ListProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductsUseCase);

    try {
      const products = await listProducts.execute();
      return response.status(200).json(products);
    } catch (err: any) {
      return response.status(400).json(err.errors);
    }
  }
}
