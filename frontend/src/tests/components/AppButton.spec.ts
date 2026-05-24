import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import AppButton from "../../shared/components/ui/AppButton.vue";

describe("AppButton", () => {
  it("deve renderizar o conteúdo do slot", () => {
    const wrapper = mount(AppButton, {
      slots: {
        default: "Salvar",
      },
    });

    expect(wrapper.text()).toContain("Salvar");
  });

  it("deve desabilitar o botão quando disabled for true", () => {
    const wrapper = mount(AppButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: "Salvar",
      },
    });

    expect(wrapper.find("button").attributes("disabled")).toBeDefined();
  });
});