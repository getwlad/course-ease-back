import { Router } from "express";
import { StudentController } from "../../../application/controllers/StudentController";

const router = Router();
const studentController = new StudentController();

/**
 * @swagger
 * /student:
 *   get:
 *     tags: [Student]
 *     description: Retorna todos os estudantes.
 *     responses:
 *       200:
 *         description: Lista de todos os estudantes.
 */
router.get("/", studentController.getAllStudents.bind(studentController));

/**
 * @swagger
 * /student/{id}:
 *   get:
 *     tags: [Student]
 *     description: Retorna um estudante específico pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do estudante a ser retornado.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estudante retornado com sucesso.
 *       404:
 *         description: Estudante não encontrado.
 */
router.get("/:id", studentController.getStudentById.bind(studentController));

/**
 * @swagger
 * /student:
 *   post:
 *     tags: [Student]
 *     description: Cria um novo estudante.
 *     responses:
 *       200:
 *         description: Estudante criado com sucesso.
 */
router.post("/", studentController.createStudent.bind(studentController));

/**
 * @swagger
 * /student/{id}:
 *   put:
 *     tags: [Student]
 *     description: Atualiza as informações de um estudante existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do estudante a ser atualizado.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estudante atualizado com sucesso.
 *       404:
 *         description: Estudante não encontrado.
 */
router.put("/:id", studentController.updateStudent.bind(studentController));

/**
 * @swagger
 * /student/{id}:
 *   delete:
 *     tags: [Student]
 *     description: Exclui permanentemente um estudante.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do estudante a ser excluído.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estudante excluído com sucesso.
 *       404:
 *         description: Estudante não encontrado.
 */
router.delete("/:id", studentController.deleteStudent.bind(studentController));

export default router;
