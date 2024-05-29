import { Request, Response } from "express";
import AuthenticationService from "../services/user/AuthenticationService";
import { UserRequestDTO } from "../dto/user/UserRequestDTO";
import { UserResponseDTO } from "../dto/user/UserResponseDTO";

export class AuthenticationController {
  private authenticationService: AuthenticationService;
  constructor() {
    this.authenticationService = new AuthenticationService();
  }

  async authenticate(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const result = await this.authenticationService.authenticate(
        username,
        password
      );
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
        await this.authenticationService.createUser(userData);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
