import { Request, Response } from "express";
import { CourseRequestSchema } from "../../schemas/CourseRequestSchema";
import { Course } from "../../../domain/models";

export default class CourseSchemaService {
  static async validateCourseCreate(
    req: Request,
    res: Response,
    next: Function
  ) {
    const courseData: Partial<Course> = req.body;
    try {
      await CourseRequestSchema.validate(courseData, { abortEarly: false });
      next();
    } catch (error: any) {
      res.status(400).json({ message: error.errors });
    }
  }
}
