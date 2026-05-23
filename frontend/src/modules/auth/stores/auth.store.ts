import { defineStore } from "pinia";
import { login as loginService, register as registerService } from "../services/auth.service";
import type { AuthUser, LoginPayload, RegisterPayload } from "../services/auth.service";

const TOKEN_KEY = "@alexbase:token";
const USER_KEY = "@alexbase:user";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem(TOKEN_KEY) || "",
    user: JSON.parse(localStorage.getItem(USER_KEY) || "null") as AuthUser | null,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === "ADMIN" || state.user?.role === "admin",
  },

  actions: {
    async login(payload: LoginPayload) {
      this.loading = true;

      try {
        const response = await loginService(payload);

        this.token = response.token;
        this.user = response.user;

        localStorage.setItem(TOKEN_KEY, response.token);
        localStorage.setItem(USER_KEY, JSON.stringify(response.user));

        return response;
      } finally {
        this.loading = false;
      }
    },

    async register(payload: RegisterPayload) {
      this.loading = true;

      try {
        return await registerService(payload);
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.token = "";
      this.user = null;

      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    },
  },
});