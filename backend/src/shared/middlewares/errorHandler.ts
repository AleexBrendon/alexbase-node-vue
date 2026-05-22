import type { ErrorRequestHandler } from "express";

import { AppError } from "../errors/AppError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { logger } from "../utils/logger.js";
import { MESSAGES } from "../constants/messages.js";

export const errorHandler: ErrorRequestHandler = (
  error,
  _request,
  response,
  _next
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json(
      ApiResponse.error(error.message)
    );
  }

  logger.error(error);

  return response.status(500).json(
    ApiResponse.error(MESSAGES.INTERNAL_SERVER_ERROR)
  );
};