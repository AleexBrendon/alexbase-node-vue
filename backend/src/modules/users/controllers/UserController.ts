import type { Request, Response } from "express";

import { UserService } from "../services/UserService.js";
import { getPaginationParams } from "../../../shared/utils/pagination.js";
import { ApiResponse } from "../../../shared/utils/apiResponse.js";

export class UserController {
  async index(request: Request, response: Response) {
    const pagination = getPaginationParams(request);

    const search =
      typeof request.query.search === "string"
        ? request.query.search
        : undefined;

    const userService = new UserService();

    const result = await userService.listUsers({
      ...pagination,
      search,
      companyId: request.user.companyId,
    });

    return response.json(
      ApiResponse.success(result, "Usuários encontrados.")
    );
  }

  async create(request: Request, response: Response) {
    const userService = new UserService();

    const user = await userService.createUser(request.body, {
      id: request.user.id,
      name: request.user.name,
      email: request.user.email,
      role: request.user.role,
      companyId: request.user.companyId,
    });

    return response
      .status(201)
      .json(ApiResponse.success(user, "Usuário criado com sucesso."));
  }

  async update(request: Request, response: Response) {
    const userService = new UserService();

    const user = await userService.updateUser(
      request.params.id,
      request.body,
      {
        id: request.user.id,
        name: request.user.name,
        email: request.user.email,
        role: request.user.role,
        companyId: request.user.companyId,
      }
    );

    return response.json(
      ApiResponse.success(user, "Usuário atualizado.")
    );
  }

  async delete(request: Request, response: Response) {
    const userService = new UserService();

    await userService.deleteUser(request.params.id, {
      id: request.user.id,
      name: request.user.name,
      email: request.user.email,
      role: request.user.role,
      companyId: request.user.companyId,
    });

    return response.json(
      ApiResponse.success(null, "Usuário removido.")
    );
  }
}