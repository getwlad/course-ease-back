import { Request, Response } from "express";
import {
  StudentRequestSchema,
  StudentUpdateSchema,
} from "../../schemas/StudentSchema";

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
  static async validateStudentUpdate(
    req: Request,
    res: Response,
    next: Function
  ) {
    const studentData = req.body;
    try {
      await StudentUpdateSchema.validate(studentData, { abortEarly: false });
      next();
    } catch (error: any) {
      res.status(400).json({ message: error.errors });
    }
  }
}
