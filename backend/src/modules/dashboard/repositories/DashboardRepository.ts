import { prisma } from "../../../database/prisma.js";

export class DashboardRepository {
  async getStats(companyId: string) {
    const totalUsers = await prisma.user.count({
      where: {
        companyId,
      },
    });

    const admins = await prisma.user.count({
      where: {
        companyId,
        role: "admin",
      },
    });

    const users = await prisma.user.count({
      where: {
        companyId,
        role: "user",
      },
    });

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const newUsersToday = await prisma.user.count({
      where: {
        companyId,
        createdAt: {
          gte: today,
        },
      },
    });

    const sevenDaysAgo = new Date();

    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const usersCreated = await prisma.user.findMany({
      where: {
        companyId,
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const last7Days = Array.from({ length: 7 }).map((_, index) => {
      const date = new Date();

      date.setDate(date.getDate() - (6 - index));
      date.setHours(0, 0, 0, 0);

      const label = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      });

      const count = usersCreated.filter((user) => {
        const userDate = new Date(user.createdAt);

        return userDate.toDateString() === date.toDateString();
      }).length;

      return {
        label,
        count,
      };
    });

    return {
      totalUsers,
      admins,
      users,
      newUsersToday,

      rolesChart: {
        labels: ["Admins", "Usuários"],
        series: [admins, users],
      },

      usersByDayChart: {
        labels: last7Days.map((day) => day.label),
        series: last7Days.map((day) => day.count),
      },
    };
  }
}