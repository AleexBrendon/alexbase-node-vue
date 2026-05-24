import { Router } from "express";

import { ActivityController } from "../controllers/ActivityController.js";
import { PERMISSIONS } from "../../../shared/constants/permissions.js";
import { permissionMiddleware } from "../../../shared/middlewares/permissionMiddleware.js";

const activityRoutes = Router();

const controller = new ActivityController();

/**
 * @swagger
 * tags:
 *   name: Activities
 *   description: Histórico de atividades
 */

/**
 * @swagger
 * /activities:
 *   get:
 *     summary: Listar atividades recentes
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de atividades
 *       401:
 *         description: Não autenticado
 */

activityRoutes.get(
  "/",
  permissionMiddleware([PERMISSIONS.ACTIVITIES_READ]),
  controller.index
);

export { activityRoutes };