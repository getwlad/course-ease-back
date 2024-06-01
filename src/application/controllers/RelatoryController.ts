import { RelatoryService } from "../../domain/services/RelatoryService";
import { Request, Response } from "express";

export class RelatoryController {
  private relatoryService: RelatoryService;

  constructor() {
    this.relatoryService = new RelatoryService();
  }

  async getRelatory(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.relatoryService.getDashboardRelatory();
      res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
