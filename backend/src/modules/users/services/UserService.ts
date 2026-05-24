import bcrypt from "bcryptjs";

import { UserRepository } from "../repositories/UserRepository.js";
import { AppError } from "../../../shared/errors/AppError.js";
import { MESSAGES } from "../../../shared/constants/messages.js";
import { authConfig } from "../../../config/auth.js";
import { ActivityService } from "../../activities/services/ActivityService.js";
import type { CreateUserDTO, UpdateUserDTO } from "../dtos/UserDTO.js";

export class UserService {
  private userRepository = new UserRepository();
  private activityService = new ActivityService();

  async listUsers(params: {
    page: number;
    perPage: number;
    skip: number;
    search?: string;
    companyId: string;
  }) {
    const result = await this.userRepository.findAll({
      skip: params.skip,
      perPage: params.perPage,
      search: params.search,
      companyId: params.companyId,
    });

    return {
      data: result.users,
      meta: {
        page: params.page,
        perPage: params.perPage,
        total: result.total,
        totalPages: Math.ceil(result.total / params.perPage),
      },
    };
  }

  async createUser(
    data: CreateUserDTO,
    actor: Actor
  ) {
    const userExists = await this.userRepository.findByEmail(
      data.email
    );

    if (userExists) {
      throw new AppError(
        MESSAGES.EMAIL_ALREADY_EXISTS,
        409
      );
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      authConfig.bcrypt.saltRounds
    );

    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
      companyId: actor.companyId,
    });

    await this.activityService.createActivity({
      type: "created",
      title: "Usuário criado",
      description: `${actor.name || "Sistema"} criou o usuário ${user.name}.`,
      userId: actor.id,
      userName: actor.name,
      companyId: actor.companyId,
    });

    return user;
  }

  async updateUser(
    id: string,
    data: UpdateUserDTO,
    actor: Actor
  ) {
    const user = await this.userRepository.findById(
      id,
      actor.companyId
    );

    if (!user) {
      throw new AppError(
        "Usuário não encontrado",
        404
      );
    }

    let password: string | undefined;

    if (data.password) {
      password = await bcrypt.hash(
        data.password,
        authConfig.bcrypt.saltRounds
      );
    }

    const updatedUser = await this.userRepository.update(
      id,
      actor.companyId,
      {
        ...data,
        ...(password ? { password } : {}),
      }
    );

    await this.activityService.createActivity({
      type: "updated",
      title: "Usuário atualizado",
      description: `${actor.name || "Sistema"} atualizou o usuário ${updatedUser.name}.`,
      userId: actor.id,
      userName: actor.name,
      companyId: actor.companyId,
    });

    return updatedUser;
  }

  async deleteUser(
    id: string,
    actor: Actor
  ) {
    const user = await this.userRepository.findById(
      id,
      actor.companyId
    );

    if (!user) {
      throw new AppError(
        "Usuário não encontrado",
        404
      );
    }

    await this.userRepository.delete(
      id,
      actor.companyId
    );

    await this.activityService.createActivity({
      type: "deleted",
      title: "Usuário removido",
      description: `${actor.name || "Sistema"} removeu o usuário ${user.name}.`,
      userId: actor.id,
      userName: actor.name,
      companyId: actor.companyId,
    });

    return true;
  }
}