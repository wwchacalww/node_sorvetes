import { Request, Response } from "express";
import { container } from "tsyringe";
import { SetProductPriceUseCase } from "./set-product-price.usecase";

export class SetProductPriceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { product_id, price, cost } = request.body;
    const setProductPrice = container.resolve(SetProductPriceUseCase);

    try {
      const priced = await setProductPrice.execute({
        product_id,
        price,
        cost,
      });

      return response.status(201).json(priced);
    } catch (err: any) {
      return response.status(400).json(err.errors);
    }
  }
}
