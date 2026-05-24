import { prisma } from "../../../database/prisma.js";

export class UserRepository {
  async findAll(params: {
    skip: number;
    perPage: number;
    search?: string;
  }) {
    const where = params.search
      ? {
        OR: [
          {
            name: {
              contains: params.search,
              mode: "insensitive" as const,
            },
          },
          {
            email: {
              contains: params.search,
              mode: "insensitive" as const,
            },
          },
        ],
      }
      : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
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

      prisma.user.count({
        where,
      }),
    ]);

    return {
      users,
      total,
    };
  }

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
    role: string;
  }) {
    return prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    companyId: string,
    data: {
      name?: string;
      email?: string;
      password?: string;
      role?: string;
    }
  ) {
    await prisma.user.updateMany({
      where: {
        id,
        companyId,
      },
      data,
    });

    return prisma.user.findFirstOrThrow({
      where: {
        id,
        companyId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        companyId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async delete(
    id: string,
    companyId: string
  ) {
    return prisma.user.deleteMany({
      where: {
        id,
        companyId,
      },
    });
  }
}