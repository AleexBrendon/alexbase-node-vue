import { Router } from "express";

import { authRoutes } from "../modules/auth/routes/auth.routes.js";
import { userRoutes } from "../modules/users/routes/user.routes.js";
import { dashboardRoutes } from "../modules/dashboard/routes/dashboard.routes.js";
import { activityRoutes } from "../modules/activities/routes/activity.routes.js";
import { profileRoutes } from "../modules/profile/routes/profile.routes.js";

export const routes = Router();

routes.get("/", (_request, response) => {
  return response.json({
    message: "AlexBase API funcionando 🚀",
  });
});

routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
routes.use("/dashboard", dashboardRoutes);
routes.use("/activities", activityRoutes);
routes.use("/me", profileRoutes);