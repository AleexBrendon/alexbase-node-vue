import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { prisma } from "../../database/prisma.js";
import { authConfig } from "../../config/auth.js";
import { AppError } from "../errors/AppError.js";
import { MESSAGES } from "../constants/messages.js";

type JwtPayload = {
  sub: string;
  role: string;
  companyId: string;
};

export async function authMiddleware(
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

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.sub,
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        companyId: true,
      },
    });

    if (!user) {
      throw new AppError(
        "Usuário não encontrado.",
        401
      );
    }

    request.user = user;

    return next();
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      MESSAGES.INVALID_TOKEN,
      401
    );
  }
}