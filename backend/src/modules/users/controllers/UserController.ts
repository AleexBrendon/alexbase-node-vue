import type { Request, Response } from "express";

import { UserService } from "../services/UserService.js";
import { getPaginationParams } from "../../../shared/utils/pagination.js";
import { ApiResponse } from "../../../shared/utils/apiResponse.js";

export class UserController {
  async index(request: Request, response: Response) {
    const pagination = getPaginationParams(request);

    const userService = new UserService();

    const result = await userService.listUsers(pagination);

    return response.json(
      ApiResponse.success(result, "Usuários encontrados.")
    );
  }
}