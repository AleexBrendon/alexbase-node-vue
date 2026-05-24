import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";

import Users from "../../modules/users/pages/UsersPage.vue";

vi.mock("../../modules/users/services/users.service", () => ({
  getUsers: vi.fn().mockResolvedValue({
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