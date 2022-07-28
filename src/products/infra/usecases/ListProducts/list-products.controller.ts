import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListProductsUseCase } from "./list-products.usecase";

export class ListProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductsUseCase);

    try {
      const products = await listProducts.execute();
      return response
        .header("Access-Control-Expose-Headers", "x-total-count")
        .setHeader("x-total-count", products.products.length.toString())
        .status(200)
        .json(products);
    } catch (err: any) {
      return response.status(400).json(err.errors);
    }
  }
}
