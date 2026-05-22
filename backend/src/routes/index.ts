import { Router } from "express";

import { authRoutes } from "../modules/auth/routes/auth.routes.js";
import { userRoutes } from "../modules/users/routes/user.routes.js";

export const routes = Router();

routes.get("/", (_request, response) => {
  return response.json({
    message: "AlexBase API funcionando 🚀",
  });
});

routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);