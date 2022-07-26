import { Router } from "express";
import { ensureAuthenticate } from "infra/middleware/ensureAuthenticate";
import { AuthenticateController } from "../userCases/Authenticate/authenticate-user-controller";
import { CreateUserController } from "../userCases/CreateUser/create-user.controller";
import { RefreshTokenController } from "../userCases/RefreshToken/refresh-token.controller";
import { MeController } from "../userCases/me/me.controller";

const userRouter = Router();

const createUserController = new CreateUserController();
const authenticateController = new AuthenticateController();
const refreshController = new RefreshTokenController();
const meController = new MeController();

userRouter.post("/", createUserController.handle);
userRouter.post("/create", ensureAuthenticate, createUserController.handle);
userRouter.post("/sessions", authenticateController.handle);
userRouter.post("/refresh", ensureAuthenticate, refreshController.handle);
userRouter.get("/me", ensureAuthenticate, meController.handle);

export { userRouter };
