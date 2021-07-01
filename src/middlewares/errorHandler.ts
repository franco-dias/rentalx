import { Request, Response } from "express";

import { AppError } from "../errors/AppError";

export default function errorHandler(
  err: Error,
  request: Request,
  response: Response
): Response {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }
  return response
    .status(500)
    .json({ message: `Internal server error - ${err.message}` });
}
