import { config } from "@vue/test-utils";

config.global.mocks = {
  $route: {},
  $router: {},
};