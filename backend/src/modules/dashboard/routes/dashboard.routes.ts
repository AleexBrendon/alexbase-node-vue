import { Router } from "express";
import { DashboardController } from "../controllers/DashboardController.js";
import { PERMISSIONS } from "../../../shared/constants/permissions.js";
import { permissionMiddleware } from "../../../shared/middlewares/permissionMiddleware.js";

const dashboardRoutes = Router();

const controller =
  new DashboardController();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dados gerais do sistema
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Buscar KPIs do dashboard
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do dashboard retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: number
 *                   example: 25
 *                 totalAdmins:
 *                   type: number
 *                   example: 2
 *                 totalUsersCommon:
 *                   type: number
 *                   example: 23
 *                 recentActivities:
 *                   type: array
 *       401:
 *         description: Não autenticado
 */

dashboardRoutes.get(
  "/",
  permissionMiddleware([PERMISSIONS.DASHBOARD_READ]),
  controller.index
);

export { dashboardRoutes };