import { Request, Response } from "express";
import { UserRequestSchema } from "../../schemas/UserRequestSchema";

export default class UserSchemaService {
  static async validateUserCreate(req: Request, res: Response, next: Function) {
    const userData = req.body;
    try {
      await UserRequestSchema.validate(userData, { abortEarly: false });
      next();
    } catch (error: any) {
      res.status(400).json({ message: error.errors });
    }
  }
}
