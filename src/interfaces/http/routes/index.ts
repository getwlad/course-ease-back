import { Router } from "express";
import homeRoutes from "./homeRoutes";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Home
 *   description: Home operations
 */
router.use("/home", homeRoutes);

export default router;
