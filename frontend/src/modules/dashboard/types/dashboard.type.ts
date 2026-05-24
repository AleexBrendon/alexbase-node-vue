export type DashboardData = {
  totalUsers: number;
  admins: number;
  users: number;
  newUsersToday: number;

  rolesChart: {
    labels: string[];
    series: number[];
  };

  usersByDayChart: {
    labels: string[];
    series: number[];
  };
};