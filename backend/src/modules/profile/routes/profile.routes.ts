import { Router } from "express";

import { ProfileController } from "../controllers/ProfileController.js";
import { PERMISSIONS } from "../../../shared/constants/permissions.js";
import { permissionMiddleware } from "../../../shared/middlewares/permissionMiddleware.js";

const profileRoutes = Router();

const controller = new ProfileController();

profileRoutes.get("/", permissionMiddleware([PERMISSIONS.PROFILE_READ]), controller.show);
profileRoutes.patch("/", permissionMiddleware([PERMISSIONS.PROFILE_UPDATE]), controller.update);

export { profileRoutes };