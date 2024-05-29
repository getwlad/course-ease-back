import { Request, Response } from "express";

class HomeController {
  async list(req: Request, res: Response) {
    try {
      return res.status(200).json({ msg: "Bem vindo" });
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}
export default new HomeController();
