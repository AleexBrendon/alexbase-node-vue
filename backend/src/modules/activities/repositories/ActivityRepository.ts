import { prisma } from "../../../database/prisma.js";

export class ActivityRepository {
  async create(data: {
    type: string;
    title: string;
    description?: string;
    userId?: string;
    userName?: string;
    companyId: string;
  }) {
    return prisma.activity.create({
      data,
    });
  }

  async findLatest(companyId: string, limit = 10) {
    return prisma.activity.findMany({
      where: {
        companyId,
      },
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}