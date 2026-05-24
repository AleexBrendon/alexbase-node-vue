import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { describe, expect, it, vi } from "vitest";

import Dashboard from "../../modules/dashboard/pages/DashboardPage.vue";

type DashboardMockResponse = {
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

vi.mock("../../modules/dashboard/services/dashboard.service", () => ({
  getDashboardData: vi.fn<() => Promise<DashboardMockResponse>>().mockResolvedValue({
    totalUsers: 20,
    admins: 2,
    users: 18,
    newUsersToday: 5,
    rolesChart: {
      labels: ["Admin", "User"],
      series: [2, 18],
    },
    usersByDayChart: {
      labels: [],
      series: [],
    },
  }),
}));

vi.mock("../../modules/activities/services/activity.service", () => ({
  getActivities: vi.fn<() => Promise<unknown[]>>().mockResolvedValue([]),
}));

describe("Dashboard", () => {
  it("deve renderizar dashboard", () => {
    const wrapper = mount(Dashboard, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
        stubs: {
          apexchart: true,
          KpiCard: true,
        },
      },
    });

    expect(wrapper.text()).toContain("Dashboard");
  });
});