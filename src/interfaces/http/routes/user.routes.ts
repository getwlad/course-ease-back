import { Router } from "express";
import { UserController } from "../../../application/controllers/UserController";
import UserValidationService from "../../../application/services/user/UserSchemaService";

const router = Router();
const userController = new UserController();

/**
 * @swagger
 * /user:
 *   get:
 *     tags: [User]
 *     summary: Retorna todos os usuários.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos os usuários.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserResponse'
 */
router.get("/", userController.getAllUsers.bind(userController));

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags: [User]
 *     summary: Retorna um usuário específico pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser retornado.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário retornado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       404:
 *         description: Usuário não encontrado.
 */
router.get("/:id", userController.getUserById.bind(userController));

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     tags: [User]
 *     summary: Atualiza as informações de um usuário existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser atualizado.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRequest'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       404:
 *         description: Usuário não encontrado.
 */
router.put(
  "/:id",
  UserValidationService.validateUserCreate,
  userController.updateUser.bind(userController)
);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     tags: [User]
 *     summary: Exclui suavemente um usuário.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser excluído.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 */
router.delete("/:id", userController.softDeleteUser.bind(userController));

export default router;
