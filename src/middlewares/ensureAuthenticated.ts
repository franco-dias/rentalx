import { Request, Response, NextFunction, request } from "express";
import jwt from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) {
    throw new AppError("Token is missing", 401);
  }
  const [, token] = authorization.split(" ");

  try {
    const { sub } = jwt.verify(token, "ignite-backend-key-secret") as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(sub);

    if (!user) {
      throw new AppError("User does not exist.", 401);
    }

    request.user = { id: sub };

    return next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}

export { ensureAuthenticated };
