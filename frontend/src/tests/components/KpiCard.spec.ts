import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import KpiCard from "../../modules/dashboard/components/KpiCard.vue";

describe("KpiCard", () => {
  it("deve renderizar título e valor", () => {
    const wrapper = mount(KpiCard, {
      props: {
        title: "Usuários",
        value: 20,
      },
    });

    expect(wrapper.text()).toContain("Usuários");
    expect(wrapper.text()).toContain("20");
  });
});