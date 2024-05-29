import { Router } from "express";
import { CourseController } from "../../../application/controllers/CourseController,";

const router = Router();
const courseController = new CourseController();

/**
 * @swagger
 * /course:
 *   get:
 *     tags: [Course]
 *     description: Retorna todos os cursos.
 *     responses:
 *       200:
 *         description: Lista de todos os cursos.
 */
router.get("/", courseController.getAllCourses.bind(courseController));

/**
 * @swagger
 * /course/{id}:
 *   get:
 *     tags: [Course]
 *     description: Retorna um curso específico pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do curso a ser retornado.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Curso retornado com sucesso.
 *       404:
 *         description: Curso não encontrado.
 */
router.get("/:id", courseController.getCourseById.bind(courseController));

/**
 * @swagger
 * /course:
 *   post:
 *     tags: [Course]
 *     description: Cria um novo curso.
 *     responses:
 *       200:
 *         description: Curso criado com sucesso.
 */
router.post("/", courseController.createCourse.bind(courseController));

/**
 * @swagger
 * /course/{id}:
 *   put:
 *     tags: [Course]
 *     description: Atualiza as informações de um curso existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do curso a ser atualizado.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Curso atualizado com sucesso.
 *       404:
 *         description: Curso não encontrado.
 */
router.put("/:id", courseController.updateCourse.bind(courseController));

/**
 * @swagger
 * /course/{id}:
 *   delete:
 *     tags: [Course]
 *     description: Exclui suavemente um curso.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do curso a ser excluído.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Curso excluído com sucesso.
 *       404:
 *         description: Curso não encontrado.
 */
router.delete("/:id", courseController.softDeleteCourse.bind(courseController));

export default router;
