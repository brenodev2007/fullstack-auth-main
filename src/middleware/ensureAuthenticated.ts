import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { verify } from "jsonwebtoken";
import { authConfig } from "@/AuthConfig/auth";

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

  const { sub: user_id } = verify(token, authConfig.jwt.secret);

  request.user = {
    id: Number(user_id),
  };

  return next();
}
