import type { Request, Response } from "express";

import { ProfileService } from "../services/ProfileService.js";
import { ApiResponse } from "../../../shared/utils/apiResponse.js";

export class ProfileController {
  async show(request: Request, response: Response) {
    const service = new ProfileService();

    const user = await service.getProfile(request.user.id);

    return response.json(
      ApiResponse.success(user, "Perfil encontrado.")
    );
  }

  async update(request: Request, response: Response) {
    const service = new ProfileService();

    const user = await service.updateProfile(
      request.user.id,
      request.body
    );

    return response.json(
      ApiResponse.success(user, "Perfil atualizado.")
    );
  }
}