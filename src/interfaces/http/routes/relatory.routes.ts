import { Router } from "express";
import { RelatoryController } from "../../../application/controllers/RelatoryController";
const router = Router();
const relatoryController = new RelatoryController();

/**
 * @swagger
 * /relatory:
 *   get:
 *     tags: [Relatory]
 *     summary: Retorna um relatório.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Obtem um relatório.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RelatoryResponseDTO'
 */
router.get("/", relatoryController.getRelatory.bind(relatoryController));

export default router;
