import bcrypt from "bcryptjs";

import { ProfileRepository } from "../repositories/ProfileRepository.js";
import { AppError } from "../../../shared/errors/AppError.js";
import { MESSAGES } from "../../../shared/constants/messages.js";
import { authConfig } from "../../../config/auth.js";

import type { UpdateProfileDTO } from "../dtos/ProfileDTO.js";

export class ProfileService {
  private repository = new ProfileRepository();

  async getProfile(userId: string) {
    const user = await this.repository.findById(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    return user;
  }

  async updateProfile(userId: string, data: UpdateProfileDTO) {
    const user = await this.repository.findById(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    if (data.email && data.email !== user.email) {
      const emailExists = await this.repository.findByEmail(data.email);

      if (emailExists) {
        throw new AppError(MESSAGES.EMAIL_ALREADY_EXISTS, 409);
      }
    }

    let password: string | undefined;

    if (data.password) {
      password = await bcrypt.hash(
        data.password,
        authConfig.bcrypt.saltRounds
      );
    }

    const updateData: {
  name?: string;
  email?: string;
  password?: string;
} = {};

if (data.name) {
  updateData.name = data.name;
}

if (data.email) {
  updateData.email = data.email;
}

if (password) {
  updateData.password = password;
}

return this.repository.update(userId, updateData);
  }
}