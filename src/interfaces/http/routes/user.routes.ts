import { Router } from "express";
import { UserController } from "../../../application/controllers/UserController";

const router = Router();
const userController = new UserController();

/**
 * @swagger
 * /user:
 *   get:
 *     tags: [User]
 *     description: Retorna todos os usuários.
 *     responses:
 *       200:
 *         description: Lista de todos os usuários.
 */
router.get("/", userController.getAllUsers.bind(userController));

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags: [User]
 *     description: Retorna um usuário específico pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser retornado.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário retornado com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 */
router.get("/:id", userController.getUserById.bind(userController));

/**
 * @swagger
 * /user:
 *   post:
 *     tags: [User]
 *     description: Cria um novo usuário.
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso.
 */
router.post("/", userController.createUser.bind(userController));

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     tags: [User]
 *     description: Atualiza as informações de um usuário existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser atualizado.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 */
router.put("/:id", userController.updateUser.bind(userController));

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     tags: [User]
 *     description: Exclui suavemente um usuário.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser excluído.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 */
router.delete("/:id", userController.softDeleteUser.bind(userController));

export default router;
