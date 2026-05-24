import type { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/AppError.js";
import { MESSAGES } from "../constants/messages.js";
import type { Role } from "../constants/roles.js";

export function roleMiddleware(roles: Role[]) {
  return (request: Request, _response: Response, next: NextFunction) => {
    if (!request.user) {
      throw new AppError(MESSAGES.UNAUTHORIZED, 401);
    }

    if (!roles.includes(request.user.role as Role)) {
      throw new AppError("Você não tem permissão para acessar este recurso.", 403);
    }

    return next();
  };
}