import { getUsers } from "@/modules/users/services/users.service";
import type { DashboardData } from "../types/dashboard.type";

export async function getDashboardData(): Promise<DashboardData> {
  const result = await getUsers({
    page: 1,
    perPage: 100,
  });

  const users = result.data;

  return {
    users: result.meta.total,
    admins: users.filter((u) => u.role?.toLowerCase() === "admin").length,
    regularUsers: users.filter((u) => u.role?.toLowerCase() === "user").length,
  };
}