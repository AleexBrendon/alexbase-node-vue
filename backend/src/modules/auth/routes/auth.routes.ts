import { Router } from "express";

import { AuthController } from "../controllers/AuthController.js";

export const authRoutes = Router();

const authController = new AuthController();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar usuário
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login usuário
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado
 */

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);