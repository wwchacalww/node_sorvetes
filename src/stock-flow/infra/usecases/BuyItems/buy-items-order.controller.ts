import { Request, Response } from "express";
import { container } from "tsyringe";
import { BuyItemOrderUseCase } from "./buy-items-order.usecase";

export class BuyItemOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { items, type, status } = request.body;
    const createOrder = container.resolve(BuyItemOrderUseCase);

    if (!items || !type || !status) {
      return response.status(400).json({ error: "Invalid request" });
    }

    try {
      const order = await createOrder.execute({
        items,
        type: "compra",
        status: "fechado",
      });

      return response.status(201).json(order.toJSON());
    } catch (err: any) {
      return response.status(400).json(err.errors);
    }
  }
}
