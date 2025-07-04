import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { verify } from "jsonwebtoken";
import { authConfig } from "@/AuthConfig/auth";

interface TokenPayLoad {
  roles: string;
  sub: string;
}

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

  const { sub: user_id, roles } = verify(
    token,
    authConfig.jwt.secret
  ) as TokenPayLoad;

  request.user = {
    id: Number(user_id),
    roles,
  };

  return next();
}
