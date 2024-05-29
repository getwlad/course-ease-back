import { Router } from "express";
import { TeacherController } from "../../../application/controllers/TeacherController";
import TeacherValidationService from "../../../application/services/teacher/TeacherValidationService";

const router = Router();
const teacherController = new TeacherController();

/**
 * @swagger
 * /teacher:
 *   get:
 *     tags: [Teacher]
 *     summary: Retorna todos os professores.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos os professores.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TeacherResponse'
 */
router.get("/", teacherController.getAllTeachers.bind(teacherController));

/**
 * @swagger
 * /teacher/{id}:
 *   get:
 *     tags: [Teacher]
 *     summary: Retorna um professor específico pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do professor a ser retornado.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Professor retornado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeacherFullResponse'
 *       404:
 *         description: Professor não encontrado.
 */
router.get("/:id", teacherController.getTeacherById.bind(teacherController));

/**
 * @swagger
 * /teacher:
 *   post:
 *     tags: [Teacher]
 *     summary: Cria um novo professor.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeacherRequest'
 *     responses:
 *       200:
 *         description: Professor criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeacherFullResponse'
 */
router.post(
  "/",
  TeacherValidationService.validateTeacherCreate,
  teacherController.createTeacher.bind(teacherController)
);

/**
 * @swagger
 * /teacher/{id}:
 *   put:
 *     tags: [Teacher]
 *     summary: Atualiza as informações de um professor existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do professor a ser atualizado.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeacherRequest'
 *     responses:
 *       200:
 *         description: Professor atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeacherFullResponse'
 *       404:
 *         description: Professor não encontrado.
 */
router.put(
  "/:id",
  TeacherValidationService.validateTeacherCreate,
  teacherController.updateTeacher.bind(teacherController)
);

/**
 * @swagger
 * /teacher/{id}:
 *   delete:
 *     tags: [Teacher]
 *     summary: Exclui permanentemente um professor.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do professor a ser excluído.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Professor excluído com sucesso.
 *       404:
 *         description: Professor não encontrado.
 */
router.delete("/:id", teacherController.deleteTeacher.bind(teacherController));

export default router;
