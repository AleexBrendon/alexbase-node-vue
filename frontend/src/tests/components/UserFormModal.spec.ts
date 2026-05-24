import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import UserFormModal from "../../modules/users/components/UserFormModal.vue";

describe("UserFormModal", () => {
  it("deve renderizar modal", () => {
    const wrapper = mount(UserFormModal, {
      props: {},
    });

    expect(wrapper.exists()).toBe(true);
  });
});