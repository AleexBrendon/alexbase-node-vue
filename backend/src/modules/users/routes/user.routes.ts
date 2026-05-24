import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import { authMiddleware } from "../../../shared/middlewares/authMiddleware.js";
import { PERMISSIONS } from "../../../shared/constants/permissions.js";
import { permissionMiddleware } from "../../../shared/middlewares/permissionMiddleware.js";

export const userRoutes = Router();

const userController = new UserController();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Listar usuários
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *         example: 10
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         example: Alex
 *
 *     responses:
 *       200:
 *         description: Lista de usuários
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
  permissionMiddleware([PERMISSIONS.USERS_READ]),
  userController.index
);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Criar usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *
 *             properties:
 *               name:
 *                 type: string
 *                 example: Alex Brendon
 *
 *               email:
 *                 type: string
 *                 example: alex@email.com
 *
 *               password:
 *                 type: string
 *                 example: 123456
 *
 *               role:
 *                 type: string
 *                 enum: [admin,user]
 *                 example: user
 *
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *
 *       400:
 *         description: Erro de validação
 *
 *       403:
 *         description: Sem permissão
 */
userRoutes.post(
  "/",
  authMiddleware,
  permissionMiddleware([PERMISSIONS.USERS_CREATE]),
  userController.create
);;

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Atualizar usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: clx123456
 *
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             properties:
 *               name:
 *                 type: string
 *                 example: Alex Atualizado
 *
 *               email:
 *                 type: string
 *                 example: alexnovo@email.com
 *
 *               role:
 *                 type: string
 *                 enum: [admin,user]
 *
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *
 *       404:
 *         description: Usuário não encontrado
 *
 *       403:
 *         description: Sem permissão
 */
userRoutes.patch(
  "/:id",
  authMiddleware,
  permissionMiddleware([PERMISSIONS.USERS_UPDATE]),
  userController.update
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Excluir usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: clx123456
 *
 *     responses:
 *       204:
 *         description: Usuário removido
 *
 *       404:
 *         description: Usuário não encontrado
 *
 *       403:
 *         description: Sem permissão
 */
userRoutes.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware([PERMISSIONS.USERS_DELETE]),
  userController.delete
);