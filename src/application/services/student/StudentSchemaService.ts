import { Request, Response } from "express";
import { StudentRequestSchema } from "../../schemas/StudentRequestSchema";

export default class StudentSchemaService {
  static async validateStudentCreate(
    req: Request,
    res: Response,
    next: Function
  ) {
    const studentData = req.body;
    try {
      await StudentRequestSchema.validate(studentData, { abortEarly: false });
      next();
    } catch (error: any) {
      res.status(400).json({ message: error.errors });
    }
  }
}
