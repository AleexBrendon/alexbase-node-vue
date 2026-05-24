import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";

import Login from "../../modules/auth/pages/LoginPage.vue";

describe("Login", () => {
  it("deve renderizar o formulário de login", () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
        stubs: {
          RouterLink: true,
        },
      },
    });

    expect(wrapper.text()).toContain("Entrar");
    expect(wrapper.text()).toContain("Acesse sua conta AlexBase.");
    expect(wrapper.text()).toContain("Ainda não tem conta?");
  });
});