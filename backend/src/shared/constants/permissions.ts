export const PERMISSIONS = {
  USERS_READ: "users:read",
  USERS_CREATE: "users:create",
  USERS_UPDATE: "users:update",
  USERS_DELETE: "users:delete",

  DASHBOARD_READ: "dashboard:read",

  ACTIVITIES_READ: "activities:read",

  PROFILE_READ: "profile:read",
  PROFILE_UPDATE: "profile:update",
} as const;

export type Permission =
  (typeof PERMISSIONS)[keyof typeof PERMISSIONS];