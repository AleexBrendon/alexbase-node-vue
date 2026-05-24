import { Router } from "express";
import { AuthController } from "../controllers/AuthController.js";
import { authRateLimit } from "../../../shared/middlewares/rateLimit.js";

export const authRoutes = Router();

const authController = new AuthController();

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Solicitar recuperação de senha
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Solicitação processada
 */

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Redefinir senha
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha redefinida
 */

authRoutes.post("/register", authController.register);

authRoutes.post(
  "/login",
  authRateLimit,
  authController.login
);

authRoutes.post(
  "/refresh",
  authController.refresh
);

authRoutes.post(
  "/logout",
  authController.logout
);

authRoutes.post(
  "/forgot-password",
  authRateLimit,
  authController.forgotPassword
);

authRoutes.post(
  "/reset-password",
  authController.resetPassword
);