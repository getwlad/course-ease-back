import { Router } from "express";

import CourseValidationService from "../../../application/services/course/CourseSchemaService";
import { CourseController } from "../../../application/controllers/CourseController,";

const router = Router();
const courseController = new CourseController();

/**
 * @swagger
 * /course:
 *   get:
 *     tags: [Course]
 *     summary: Retorna todos os cursos.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos os cursos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CourseResponse'
 */
router.get("/", courseController.getAllCourses.bind(courseController));

/**
 * @swagger
 * /course/{id}:
 *   get:
 *     tags: [Course]
 *     summary: Retorna um curso específico pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do curso a ser retornado.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Curso retornado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseFullResponse'
 *       404:
 *         description: Curso não encontrado.
 */
router.get("/:id", courseController.getCourseById.bind(courseController));

/**
 * @swagger
 * /course:
 *   post:
 *     tags: [Course]
 *     summary: Cria um novo curso.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseRequest'
 *     responses:
 *       200:
 *         description: Curso criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseFullResponse'
 */
router.post(
  "/",
  CourseValidationService.validateCourseCreate,
  courseController.createCourse.bind(courseController)
);

/**
 * @swagger
 * /course/{id}/student:
 *   post:
 *     tags: [Course]
 *     summary: Adiciona estudantes a um curso.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do curso.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseAddStudentRequest'
 *     responses:
 *       200:
 *         description: Estudantes adicionados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseChangeStudentResDTO'
 */
router.post(
  "/:id/student",
  CourseValidationService.validateCourseAddStudent,
  (req, res) => {
    courseController.changeStudentsCourse(req, res);
  }
);

/**
 * @swagger
 * /course/{id}/student/remove:
 *   post:
 *     tags: [Course]
 *     summary: Remove estudantes de um curso.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do curso.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseAddStudentRequest'
 *     responses:
 *       200:
 *         description: Estudantes adicionados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseChangeStudentResDTO'
 */
router.post(
  "/:id/student/remove",
  CourseValidationService.validateCourseAddStudent,
  (req, res) => {
    courseController.changeStudentsCourse(req, res, true);
  }
);

/**
 * @swagger
 * /course/{id}:
 *   put:
 *     tags: [Course]
 *     summary: Atualiza as informações de um curso existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do curso a ser atualizado.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseRequest'
 *     responses:
 *       200:
 *         description: Curso atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseFullResponse'
 *       404:
 *         description: Curso não encontrado.
 */
router.put(
  "/:id",
  CourseValidationService.validateCourseCreate,
  courseController.updateCourse.bind(courseController)
);

/**
 * @swagger
 * /course/{id}:
 *   patch:
 *     tags: [Course]
 *     summary: Altera um curso para ativo ou inativo.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do curso a ser alterado.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Curso atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseResponse'
 *       404:
 *         description: Curso não encontrado.
 */
router.patch("/:id", courseController.toggleActive.bind(courseController));

/**
 * @swagger
 * /course/{id}/teacher/{teacherId}:
 *   put:
 *     tags: [Course]
 *     summary: Atualiza as o professor de um curso existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do curso a ser atualizado o professor.
 *       - in: path
 *         name: teacherId
 *         required: true
 *         description: ID do professor a ser atualizado no curso.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Curso atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseFullResponse'
 *       404:
 *         description: Curso não encontrado.
 */
router.put(
  "/:id/teacher/:teacherId",
  courseController.updateTeacher.bind(courseController)
);

/**
 * @swagger
 * /course/{id}/teacher:
 *   delete:
 *     tags: [Course]
 *     summary: Remove o professor de um curso existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do curso.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Professor removido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseFullResponse'
 *       404:
 *         description: Curso não encontrado.
 */
router.delete(
  "/:id/teacher",
  courseController.removeTeacher.bind(courseController)
);

/**
 * @swagger
 * /course/{id}:
 *   delete:
 *     tags: [Course]
 *     summary: Exclui suavemente um curso.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do curso a ser excluído.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Curso excluído com sucesso.
 *       404:
 *         description: Curso não encontrado.
 */
router.delete("/:id", courseController.softDeleteCourse.bind(courseController));

export default router;
