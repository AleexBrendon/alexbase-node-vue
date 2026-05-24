import { prisma } from "../../../database/prisma.js";

type CreateDTO = {
  token: string;
  userId: string;
  expiresAt: Date;
};

export class RefreshTokenRepository {
  async create(data: CreateDTO) {
    return prisma.refreshToken.create({
      data,
    });
  }

  async findByToken(token: string) {
    return prisma.refreshToken.findUnique({
      where: {
        token,
      },
      include: {
        user: true,
      },
    });
  }

  async revoke(token: string) {
    return prisma.refreshToken.update({
      where: {
        token,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  }

  async revokeAllFromUser(userId: string) {
    return prisma.refreshToken.updateMany({
      where: {
        userId,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  }
}