import { Router } from "express";
import courseRoutes from "./course.routes";
import studentRoutes from "./student.routes";
import teacherRoutes from "./teacher.routes";
import userRoutes from "./user.routes";
import sessionRoutes from "./session.route";
import { authenticateToken } from "../middlewares/middlewares";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Controller de autenticação de usuário
 */
router.use("/auth", sessionRoutes);

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Controller de usuário
 */
router.use("/user", authenticateToken, userRoutes);

/**
 * @swagger
 * tags:
 *   name: Course
 *   description: Controller de cursos
 */
router.use("/course", authenticateToken, courseRoutes);

/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Controller de estudantes
 */
router.use("/student", authenticateToken, studentRoutes);

/**
 * @swagger
 * tags:
 *   name: Teacher
 *   description: Controller de professores
 */
router.use("/teacher", authenticateToken, teacherRoutes);

export default router;
