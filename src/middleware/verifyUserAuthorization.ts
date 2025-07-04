import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";

export function verifyUserAuthorization(roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.user && !roles.includes(req.user?.roles)) {
      throw new AppError(
        "You do not have permission to access this resource",
        403
      );
    }
    next();
  };
}
