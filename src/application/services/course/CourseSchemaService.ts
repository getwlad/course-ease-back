import { Request, Response } from "express";
import {
  CourseRequestSchema,
  CourseChangeStudentSchema,
} from "../../schemas/CourseSchema";
import { Course } from "../../../domain/models";
import { CourseChangeStudentReqDTO } from "../../dto/course/CourseChangeStudentDTO";

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
    const courseData: CourseChangeStudentReqDTO = req.body;
    try {
      await CourseChangeStudentSchema.validate(courseData, {
        abortEarly: false,
      });
      next();
    } catch (error: any) {
      res.status(400).json({ message: error.errors });
    }
  }
}
