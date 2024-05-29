import { Request, Response } from "express";
import { UserService } from "../services/user/UserService";
import { UserResponseDTO } from "../dto/user/UserResponseDTO";
import { UserRequestDTO } from "../dto/user/UserRequestDTO";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users: UserResponseDTO[] = await this.userService.getAllUsers();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id);
    try {
      const user: UserResponseDTO = await this.userService.getUserById(id);
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData: UserRequestDTO = req.body;
      const user: UserResponseDTO = await this.userService.createUser(userData);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const id: number = parseInt(req.params.id);
      const user: UserRequestDTO = req.body;
      const updatedUser: UserResponseDTO = await this.userService.updateUser(
        id,
        user
      );
      res.json(updatedUser);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async softDeleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id: number = parseInt(req.params.id);
      await this.userService.softDeleteUser(id);
      res.status(204);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
