import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateOrderUseCase } from "./create-order.usecase";

export class CreateOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { items, type, status } = request.body;
    const createOrder = container.resolve(CreateOrderUseCase);

    if (!items || !type || !status) {
      return response.status(400).json({ error: "Invalid request" });
    }

    const order = await createOrder.execute({
      items,
      type,
      status,
    });
    return response.json(order.toJSON());
  }
}
