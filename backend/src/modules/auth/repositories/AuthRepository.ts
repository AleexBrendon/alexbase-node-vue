import { prisma } from "../../../database/prisma.js";

export class AuthRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
  }) {
    return prisma.$transaction(async (tx) => {
      const company = await tx.company.create({
        data: {
          name: `${data.name} Company`,
        },
      });

      const user = await tx.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,

          role: "admin",
          companyId: company.id,
        },

        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          companyId: true,
          createdAt: true,
        },
      });

      return user;
    });
  }

  async updatePassword(userId: string, password: string) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password,
      },
    });
  }
}