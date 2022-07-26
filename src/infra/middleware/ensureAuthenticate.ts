import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import "dotenv/config";
import { UserRepository } from "users/infra/repository/prisma/user-repository.prisma";

type PayLoadDTO = {
  id: string;
  email: string;
  isAdmin: boolean;
  permissions: string[];
  roles: string[];
};

export async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({
      message: "Token not provided",
    });
  }

  const [, token] = authorization.split(" ");

  try {
    const { id, email, isAdmin } = verify(
      token,
      process.env.JWT_SECRET
    ) as PayLoadDTO;
    const userRepository = new UserRepository();
    const user = await userRepository.findById(id);

    if (!user) {
      console.log("User not found");
      return response.status(401).json({
        message: "Invalid token",
      });
    }

    request.user_id = id;
    request.user_email = email;
    request.user_isAdmin = isAdmin;
    next();
  } catch (error) {
    console.log(error);

    return response.status(401).json({
      message: "Invalid token",
    });
  }
}
