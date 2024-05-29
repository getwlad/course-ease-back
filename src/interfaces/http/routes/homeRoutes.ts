import { Router } from "express";
import HomeController from "../../../application/controllers/Home/HomeController";
import { Request, Response } from "express";

const router = Router();

/**
 * @swagger
 * /home:
 *   get:
 *     tags: [Home]
 *     description: Get home information
 *     responses:
 *       200:
 *         description: Returns home information.
 */
router.get("/", (req: Request, res: Response) => {
  HomeController.list(req, res);
});

export default router;
