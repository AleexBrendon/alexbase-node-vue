import { http } from "../../../api/http";
import type { DashboardData } from "../types/dashboard.type";

type DashboardApiResponse = {
  totalUsers?: number;
  total?: number;
  admins?: number;
  users?: number;
  newUsersToday?: number;
  today?: number;
  rolesChart?: {
    labels: string[];
    series: number[];
  };
  usersByDayChart?: {
    labels: string[];
    series: number[];
  };
};

export async function getDashboardData(): Promise<DashboardData> {
  const response = await http.get("/dashboard");

  const data = response.data.data as DashboardApiResponse;

  return {
    totalUsers: data.totalUsers ?? data.total ?? 0,
    admins: data.admins ?? 0,
    users: data.users ?? 0,
    newUsersToday: data.newUsersToday ?? data.today ?? 0,
    rolesChart: data.rolesChart ?? {
      labels: ["Admins", "Usuários"],
      series: [data.admins ?? 0, data.users ?? 0],
    },
    usersByDayChart: data.usersByDayChart ?? {
      labels: [],
      series: [],
    },
  };
}