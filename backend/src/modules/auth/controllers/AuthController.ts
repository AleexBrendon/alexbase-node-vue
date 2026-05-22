import type { Request, Response } from "express";

import { AuthService } from "../services/AuthService.js";
import { loginSchema, registerSchema } from "../validations/auth.validation.js";
import { ApiResponse } from "../../../shared/utils/apiResponse.js";

export class AuthController {
  async register(request: Request, response: Response) {
    const data = registerSchema.parse(request.body);

    const authService = new AuthService();

    const user = await authService.register(data);

    return response.status(201).json(
      ApiResponse.success(
        user,
        "Usuário criado"
      )
    );
  }

  async login(request: Request, response: Response) {
    const data = loginSchema.parse(request.body);

    const authService = new AuthService();

    const result = await authService.login(data);

    return response.json(
      ApiResponse.success(
        result,
        "Login realizado com sucesso"
      )
    );
  }
}