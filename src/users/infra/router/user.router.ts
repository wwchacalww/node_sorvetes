import { Router } from "express";
import { ensureAuthenticate } from "infra/middleware/ensureAuthenticate";
import { AuthenticateController } from "../userCases/Authenticate/authenticate-user-controller";
import { CreateUserController } from "../userCases/CreateUser/create-user.controller";

const userRouter = Router();

const createUserController = new CreateUserController();
const authenticateController = new AuthenticateController();

userRouter.post("/", createUserController.handle);
userRouter.post("/create", ensureAuthenticate, createUserController.handle);
userRouter.post("/session", authenticateController.handle);

export { userRouter };
