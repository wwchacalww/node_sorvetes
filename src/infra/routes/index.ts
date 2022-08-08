import { Router } from "express";
import { productRouter } from "products/infra/router/product.router";
import { orderRouter } from "stock-flow/infra/router/order.router";
import { userRouter } from "../../users/infra/router/user.router";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/products", productRouter);
routes.use("/orders", orderRouter);

export { routes };
