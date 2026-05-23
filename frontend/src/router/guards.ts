import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export function authGuard(
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const token = localStorage.getItem("token");

  if (!token) {
    next("/login");
    return;
  }

  next();
}