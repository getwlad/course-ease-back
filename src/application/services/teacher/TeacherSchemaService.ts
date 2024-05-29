import { Request, Response } from "express";
import { TeacherRequestSchema } from "../../schemas/TeacherRequestSchema";

export default class TeacherSchemaService {
  static async validateTeacherCreate(
    req: Request,
    res: Response,
    next: Function
  ) {
    const teacherData = req.body;
    try {
      await TeacherRequestSchema.validate(teacherData, { abortEarly: false });
      next();
    } catch (error: any) {
      res.status(400).json({ message: error.errors });
    }
  }
}
