import { Router } from "express";
import courseRoutes from "./course.routes";
import studentRoutes from "./student.routes";
import teacherRoutes from "./teacher.routes";
import userRoutes from "./user.routes";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Course
 *   description: Controller de cursos
 */

router.use("/course", courseRoutes);

/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Controller de estudantes
 */
router.use("/student", studentRoutes);

/**
 * @swagger
 * tags:
 *   name: Teacher
 *   description: Controller de professores
 */
router.use("/teacher", teacherRoutes);

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Controller de usuário
 */
router.use("/user", userRoutes);

export default router;
