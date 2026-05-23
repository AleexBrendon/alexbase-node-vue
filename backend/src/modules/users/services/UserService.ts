import bcrypt from "bcryptjs";

import { UserRepository } from "../repositories/UserRepository.js";
import { AppError } from "../../../shared/errors/AppError.js";
import { MESSAGES } from "../../../shared/constants/messages.js";
import { authConfig } from "../../../config/auth.js";

import type { CreateUserDTO, UpdateUserDTO } from "../dtos/UserDTO.js";

export class UserService {
  private userRepository = new UserRepository();

  async listUsers(params: {
    page: number;
    perPage: number;
    skip: number;
    search?: string;
  }) {
    const result = await this.userRepository.findAll({
      skip: params.skip,
      perPage: params.perPage,
      search: params.search,
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

  async createUser(data: CreateUserDTO) {
    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) {
      throw new AppError(MESSAGES.EMAIL_ALREADY_EXISTS, 409);
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      authConfig.bcrypt.saltRounds
    );

    return this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    });
  }

  async updateUser(
    id: string,
    data: UpdateUserDTO
  ) {
    const user =
      await this.userRepository.findById(id);

    if (!user) {
      throw new AppError(
        "Usuário não encontrado",
        404
      );
    }

    let password = undefined;

    if (data.password) {
      password = await bcrypt.hash(
        data.password,
        authConfig.bcrypt.saltRounds
      );
    }

    return this.userRepository.update(
      id,
      {
        ...data,
        password,
      }
    );
  }

  async deleteUser(id: string) {
    const user =
      await this.userRepository.findById(id);

    if (!user) {
      throw new AppError(
        "Usuário não encontrado",
        404
      );
    }

    await this.userRepository.delete(id);

    return true;
  }
}