import { Request, Response } from "express";
import SessionService from "../services/user/SessionService";
import { UserRequestDTO } from "../dto/user/UserRequestDTO";
import { UserResponseDTO } from "../dto/user/UserResponseDTO";

export class SessionController {
  private sessionService: SessionService;
  constructor() {
    this.sessionService = new SessionService();
  }

  async authenticate(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const result = await this.sessionService.authenticate(username, password);
      return res.json(result);
    } catch (error: any) {
      console.error(error);
      return res.status(401).json({ error: error.message });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData: UserRequestDTO = req.body;
      const user: UserResponseDTO =
        await this.sessionService.createUser(userData);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
