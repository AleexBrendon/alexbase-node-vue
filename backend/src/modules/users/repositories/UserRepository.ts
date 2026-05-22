import { prisma } from "../../../database/prisma.js";

export class UserRepository {
  async findAll(params: { skip: number; perPage: number }) {
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip: params.skip,
        take: params.perPage,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.user.count(),
    ]);

    return {
      users,
      total,
    };
  }
}