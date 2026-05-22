import { Router } from "express";

import { UserController } from "../controllers/UserController.js";
import { authMiddleware } from "../../../shared/middlewares/authMiddleware.js";
import { ROLES } from "../../../shared/constants/roles.js";
import { roleMiddleware } from "../../../shared/middlewares/roleMiddleware.js";

export const userRoutes = Router();

const userController = new UserController();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Listar usuários
 *     tags:
 *       - Users
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *
 *     responses:
 *       200:
 *         description: Lista usuários
 *
 *       401:
 *         description: Não autorizado
 *
 *       403:
 *         description: Sem permissão
 */

userRoutes.get(
  "/",
  authMiddleware,
  roleMiddleware([ROLES.ADMIN]),
  userController.index
);