import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./create-user.usecase";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, isAdmin } = request.body;
    const createUser = container.resolve(CreateUserUseCase);

    try {
      const user = await createUser.execute({
        name,
        email,
        password,
        isAdmin,
      });

      return response.status(201).json(user);
    } catch (err: any) {
      return response.status(400).json(err.errors);
    }
  }
}
