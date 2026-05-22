import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { env } from "../../config/env.js";
import { authConfig } from "../../config/auth.js";
import { AppError } from "../errors/AppError.js";
import { MESSAGES } from "../constants/messages.js";

type JwtPayload = {
  sub: string;
  role: string;
};

export function authMiddleware(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError(
      MESSAGES.TOKEN_NOT_PROVIDED,
      401
    );
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    throw new AppError(
      MESSAGES.INVALID_TOKEN,
      401
    );
  }

  try {
    const decoded = jwt.verify(
      token,
      authConfig.jwt.secret
    ) as JwtPayload;

    request.user = {
      id: decoded.sub,
      role: decoded.role,
    };

    return next();
  } catch {
    throw new AppError(
      MESSAGES.INVALID_TOKEN,
      401
    );
  }
}