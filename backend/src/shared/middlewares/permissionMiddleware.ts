import type { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/AppError.js";
import { MESSAGES } from "../constants/messages.js";
import type { Permission } from "../constants/permissions.js";
import type { Role } from "../constants/roles.js";
import { ROLE_PERMISSIONS } from "../constants/roles.js";

export function permissionMiddleware(requiredPermissions: Permission[]) {
  return (request: Request, _response: Response, next: NextFunction) => {
    if (!request.user) {
      throw new AppError(MESSAGES.UNAUTHORIZED, 401);
    }

    const userRole = request.user.role as Role;

    const userPermissions = ROLE_PERMISSIONS[userRole];

    if (!userPermissions) {
      throw new AppError("Perfil de usuário inválido.", 403);
    }

    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      throw new AppError("Você não tem permissão para acessar este recurso.", 403);
    }

    return next();
  };
}