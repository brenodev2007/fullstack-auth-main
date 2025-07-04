import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError("Jwt Token não informado", 401);
  }

  const [, token] = authHeader.split("");

  console.log(token);
  return next();
}
