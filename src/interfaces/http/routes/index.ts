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
 *   description: Course operations
 */

router.use("/course", courseRoutes);

/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Student operations
 */
router.use("/student", studentRoutes);

/**
 * @swagger
 * tags:
 *   name: Teacher
 *   description: Teacher operations
 */
router.use("/teacher", teacherRoutes);

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User operations
 */
router.use("/user", userRoutes);

export default router;
