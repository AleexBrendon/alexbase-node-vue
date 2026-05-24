import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { describe, expect, it, vi } from "vitest";

import Users from "../../modules/users/pages/UsersPage.vue";

type UsersMockResponse = {
  data: unknown[];
  meta: {
    page: number;
    totalPages: number;
    total: number;
  };
};

vi.mock("../../modules/users/services/users.service", () => ({
  getUsers: vi.fn<() => Promise<UsersMockResponse>>().mockResolvedValue({
    data: [],
    meta: {
      page: 1,
      totalPages: 1,
      total: 0,
    },
  }),
}));

describe("Users", () => {
  it("deve renderizar página usuários", () => {
    const wrapper = mount(Users, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
        stubs: {
          AppCard: true,
          AppButton: true,
          AppInput: true,
          AppEmptyState: true,
          UserFormModal: true,
          AppConfirmModal: true,
        },
      },
    });

    expect(wrapper.text()).toContain("Usuários");
  });
});