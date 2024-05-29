import { Router } from "express";
import { StudentController } from "../../../application/controllers/StudentController";
import StudentValidationService from "../../../application/services/student/StudentValidationService";

const router = Router();
const studentController = new StudentController();

/**
 * @swagger
 * /student:
 *   get:
 *     tags: [Student]
 *     summary: Retorna todos os estudantes.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos os estudantes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StudentResponse'
 */
router.get("/", studentController.getAllStudents.bind(studentController));

/**
 * @swagger
 * /student/{id}:
 *   get:
 *     tags: [Student]
 *     summary: Retorna um estudante específico pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do estudante a ser retornado.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estudante retornado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentFullResponse'
 *       404:
 *         description: Estudante não encontrado.
 */
router.get("/:id", studentController.getStudentById.bind(studentController));

/**
 * @swagger
 * /student:
 *   post:
 *     tags: [Student]
 *     summary: Cria um novo estudante.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentRequest'
 *     responses:
 *       200:
 *         description: Estudante criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentFullResponse'
 */
router.post(
  "/",
  StudentValidationService.validateStudentCreate,
  studentController.createStudent.bind(studentController)
);

/**
 * @swagger
 * /student/{id}:
 *   put:
 *     tags: [Student]
 *     summary: Atualiza as informações de um estudante existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do estudante a ser atualizado.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentRequest'
 *     responses:
 *       200:
 *         description: Estudante atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentFullResponse'
 *       404:
 *         description: Estudante não encontrado.
 */
router.put(
  "/:id",
  StudentValidationService.validateStudentCreate,
  studentController.updateStudent.bind(studentController)
);

/**
 * @swagger
 * /student/{id}:
 *   delete:
 *     tags: [Student]
 *     summary: Exclui permanentemente um estudante.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do estudante a ser excluído.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estudante excluído com sucesso.
 *       404:
 *         description: Estudante não encontrado.
 */
router.delete("/:id", studentController.deleteStudent.bind(studentController));

export default router;
