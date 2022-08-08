import { Router } from "express";
import { onlyAdmin } from "infra/middleware/onlyAdmin";
import { BuyItemOrderController } from "../usecases/BuyItems/buy-items-order.controller";
import { BuyItemOrderUseCase } from "../usecases/BuyItems/buy-items-order.usecase";
import { CreateOrderController } from "../usecases/CreateOrder/create-order.controller";

const orderRouter = Router();

const createOrderController = new CreateOrderController();
const buyItemsOrderController = new BuyItemOrderController();

orderRouter.post("/buy", onlyAdmin, buyItemsOrderController.handle);

export { orderRouter };
