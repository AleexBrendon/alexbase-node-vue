import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../modules/auth/stores/auth.store";

import AuthLayout from "../layouts/AuthLayout.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";

import LoginPage from "../modules/auth/pages/LoginPage.vue";
import RegisterPage from "../modules/auth/pages/RegisterPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/",
      component: AuthLayout,
      children: [
        {
          path: "login",
          name: "login",
          component: LoginPage,
          meta: {
            guestOnly: true,
          },
        },
        {
          path: "register",
          name: "register",
          component: RegisterPage,
          meta: {
            guestOnly: true,
          },
        },
      ],
    },
    {
      path: "/",
      component: DashboardLayout,
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: () => import("../modules/dashboard/pages/DashboardPage.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "users",
          name: "users",
          component: () =>
            import("../modules/users/pages/UsersPage.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "profile",
          name: "profile",
          component: () => import("../modules/profile/pages/ProfilePage.vue"),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
  ],
});

router.beforeEach((to) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return "/login";
  }

  if (to.meta.guestOnly && auth.isAuthenticated) {
    return "/dashboard";
  }

  return true;
});

export default router;