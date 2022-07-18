import { Router } from "express";
import { userRouter } from "../../users/infra/router/user.router";

const routes = Router();

routes.use("/users", userRouter);

export { routes };
