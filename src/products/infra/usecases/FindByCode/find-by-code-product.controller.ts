import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindByCodeProductUseCase } from "./find-by-code-product.usecase";

export class FindByCodeProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findByCode = container.resolve(FindByCodeProductUseCase);
    const { code } = request.query;
    try {
      const product = await findByCode.execute(code.toString());
      return response.status(200).json(product);
    } catch (err: any) {
      return response.status(400).json(err.errors);
    }
  }
}
