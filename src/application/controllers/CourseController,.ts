import { Request, Response } from "express";
import { Course } from "../../domain/models/Course";
import { CourseService } from "../services/CourseService";

export class CourseController {
  private courseService: CourseService;

  constructor() {
    this.courseService = new CourseService();
  }

  async getAllCourses(req: Request, res: Response): Promise<void> {
    try {
      const courses: Course[] = await this.courseService.getAllCourses();
      res.json(courses);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getCourseById(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id);
    try {
      const course: Course = await this.courseService.getCourseById(id);
      res.json(course);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createCourse(req: Request, res: Response): Promise<void> {
    try {
      const courseData: Partial<Course> = req.body;
      const course: Course = await this.courseService.createCourse(courseData);
      res.status(201).json(course);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateCourse(req: Request, res: Response): Promise<void> {
    try {
      const course: Course = req.body;
      const updatedCourse: Course =
        await this.courseService.updateCourse(course);
      res.json(updatedCourse);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async softDeleteCourse(req: Request, res: Response): Promise<void> {
    try {
      const id: number = parseInt(req.params.id);
      const course: Course = await this.courseService.getCourseById(id);
      course.active = false;
      const softDeletedCourse: Course =
        await this.courseService.softDeleteCourse(course);
      res.json(softDeletedCourse);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
