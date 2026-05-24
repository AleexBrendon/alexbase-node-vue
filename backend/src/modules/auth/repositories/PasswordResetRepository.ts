import { prisma } from "../../../database/prisma.js";

type CreateDTO = {
  token: string;
  userId: string;
  expiresAt: Date;
};

export class PasswordResetRepository {
  async create(data: CreateDTO) {
    return prisma.passwordResetToken.create({
      data,
    });
  }

  async findByToken(token: string) {
    return prisma.passwordResetToken.findUnique({
      where: {
        token,
      },
      include: {
        user: true,
      },
    });
  }

  async markAsUsed(token: string) {
    return prisma.passwordResetToken.update({
      where: {
        token,
      },
      data: {
        usedAt: new Date(),
      },
    });
  }
}