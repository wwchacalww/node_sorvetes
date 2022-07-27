import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindByBarcodeProductUseCase } from "./find-by-barcode-product.usecase";

export class FindByBarcodeProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findByCode = container.resolve(FindByBarcodeProductUseCase);
    const { barcode } = request.query;
    try {
      const product = await findByCode.execute(barcode.toString());
      return response.status(200).json(product);
    } catch (err: any) {
      return response.status(400).json(err.errors);
    }
  }
}
