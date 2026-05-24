import type { Request, Response } from "express";

import { AuthService } from "../services/AuthService.js";
import {
  forgotPasswordSchema,
  loginSchema,
  refreshTokenSchema,
  registerSchema,
  resetPasswordSchema,
} from "../validations/auth.validation.js";
import { ApiResponse } from "../../../shared/utils/apiResponse.js";

export class AuthController {
  async register(request: Request, response: Response) {
    const data = registerSchema.parse(request.body);

    const authService = new AuthService();

    const user = await authService.register(data);

    return response
      .status(201)
      .json(ApiResponse.success(user, "Usuário criado"));
  }

  async login(request: Request, response: Response) {
    const data = loginSchema.parse(request.body);

    const authService = new AuthService();

    const result = await authService.login(data);

    return response.json(
      ApiResponse.success(result, "Login realizado com sucesso")
    );
  }

  async refresh(request: Request, response: Response) {
    const data = refreshTokenSchema.parse(request.body);

    const authService = new AuthService();

    const result = await authService.refresh(data.refreshToken);

    return response.json(
      ApiResponse.success(result, "Token atualizado com sucesso")
    );
  }

  async logout(request: Request, response: Response) {
    const data = refreshTokenSchema.parse(request.body);

    const authService = new AuthService();

    await authService.logout(data.refreshToken);

    return response.json(
      ApiResponse.success(null, "Logout realizado com sucesso")
    );
  }

  async forgotPassword(request: Request, response: Response) {
    const data = forgotPasswordSchema.parse(request.body);

    const authService = new AuthService();

    const result = await authService.forgotPassword(data.email);

    return response.json(
      ApiResponse.success(result, "Solicitação de recuperação processada")
    );
  }

  async resetPassword(request: Request, response: Response) {
    const data = resetPasswordSchema.parse(request.body);

    const authService = new AuthService();

    const result = await authService.resetPassword(
      data.token,
      data.password
    );

    return response.json(
      ApiResponse.success(result, "Senha redefinida com sucesso")
    );
  }
}