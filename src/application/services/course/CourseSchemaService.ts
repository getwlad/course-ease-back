import { Request, Response } from "express";
import {
  CourseRequestSchema,
  CourseAddStudentSchema,
} from "../../schemas/CourseSchema";
import { Course } from "../../../domain/models";
import { CourseAddStudentReqDTO } from "../../dto/course/CourseAddStudentReqDTO";

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

  static async validateCourseAddStudent(
    req: Request,
    res: Response,
    next: Function
  ) {
    const courseData: CourseAddStudentReqDTO = req.body;
    try {
      await CourseAddStudentSchema.validate(courseData, { abortEarly: false });
      next();
    } catch (error: any) {
      res.status(400).json({ message: error.errors });
    }
  }
}
