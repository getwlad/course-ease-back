import { Request, Response } from "express";
import { User } from "../../domain/models/User";
import { UserService } from "../services/UserService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users: User[] = await this.userService.getAllUsers();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id);
    try {
      const user: User = await this.userService.getUserById(id);
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData: Partial<User> = req.body;
      const user: User = await this.userService.createUser(userData);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const user: User = req.body;
      const updatedUser: User = await this.userService.updateUser(user);
      res.json(updatedUser);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async softDeleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id: number = parseInt(req.params.id);
      const user: User = await this.userService.getUserById(id);
      user.active = false;
      const softDeletedUser: User = await this.userService.softDeleteUser(user);
      res.json(softDeletedUser);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
