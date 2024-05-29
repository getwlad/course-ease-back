import { Router } from "express";
import { TeacherController } from "../../../application/controllers/TeacherController";

const router = Router();
const teacherController = new TeacherController();

/**
 * @swagger
 * /teacher:
 *   get:
 *     tags: [Teacher]
 *     description: Retorna todos os professores.
 *     responses:
 *       200:
 *         description: Lista de todos os professores.
 */
router.get("/", teacherController.getAllTeachers.bind(teacherController));

/**
 * @swagger
 * /teacher/{id}:
 *   get:
 *     tags: [Teacher]
 *     description: Retorna um professor específico pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do professor a ser retornado.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Professor retornado com sucesso.
 *       404:
 *         description: Professor não encontrado.
 */
router.get("/:id", teacherController.getTeacherById.bind(teacherController));

/**
 * @swagger
 * /teacher:
 *   post:
 *     tags: [Teacher]
 *     description: Cria um novo professor.
 *     responses:
 *       200:
 *         description: Professor criado com sucesso.
 */
router.post("/", teacherController.createTeacher.bind(teacherController));

/**
 * @swagger
 * /teacher/{id}:
 *   put:
 *     tags: [Teacher]
 *     description: Atualiza as informações de um professor existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do professor a ser atualizado.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Professor atualizado com sucesso.
 *       404:
 *         description: Professor não encontrado.
 */
router.put("/:id", teacherController.updateTeacher.bind(teacherController));

/**
 * @swagger
 * /teacher/{id}:
 *   delete:
 *     tags: [Teacher]
 *     description: Exclui permanentemente um professor.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do professor a ser excluído.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Professor excluído com sucesso.
 *       404:
 *         description: Professor não encontrado.
 */
router.delete("/:id", teacherController.deleteTeacher.bind(teacherController));

export default router;
