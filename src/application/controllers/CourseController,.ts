import { Request, Response } from "express";
import { CourseService } from "../services/course/CourseService";
import { CourseRequestDTO } from "../dto/course/CourseRequestDTO";
import { CourseDTO } from "../dto/course/CourseDTO";
import { CourseResponseDTO } from "../dto/course/CourseResponseDTO";
import {
  CourseChangeStudentReqDTO,
  CourseChangeStudentResDTO,
} from "../dto/course/CourseChangeStudentDTO";

export class CourseController {
  private courseService: CourseService;

  constructor() {
    this.courseService = new CourseService();
  }

  async getAllCourses(req: Request, res: Response): Promise<void> {
    try {
      const courses: CourseDTO[] = await this.courseService.getAllCourses();
      res.json(courses);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getCourseById(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id);
    try {
      const course: CourseResponseDTO =
        await this.courseService.getCourseById(id);
      res.json(course);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createCourse(req: Request, res: Response): Promise<void> {
    try {
      const courseData: CourseRequestDTO = req.body;
      const course: CourseResponseDTO =
        await this.courseService.createCourse(courseData);
      res.status(201).json(course);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateCourse(req: Request, res: Response): Promise<void> {
    try {
      const id: number = parseInt(req.params.id);
      const course: CourseRequestDTO = req.body;
      const updatedCourse: CourseDTO = await this.courseService.updateCourse(
        id,
        course
      );
      res.json(updatedCourse);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async softDeleteCourse(req: Request, res: Response): Promise<void> {
    try {
      const id: number = parseInt(req.params.id);
      await this.courseService.softDeleteCourse(id);
      res.json().status(204);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  async toggleActive(req: Request, res: Response): Promise<void> {
    try {
      const id: number = parseInt(req.params.id);
      const updatedCourse: CourseDTO =
        await this.courseService.toggleActive(id);
      res.json(updatedCourse);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateTeacher(req: Request, res: Response): Promise<void> {
    try {
      const id: number = parseInt(req.params.id);
      const teacherId: number = parseInt(req.params.teacherId);
      const updatedCourse: CourseDTO = await this.courseService.updateTeacher(
        id,
        teacherId
      );
      res.json(updatedCourse);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  async removeTeacher(req: Request, res: Response): Promise<void> {
    try {
      const id: number = parseInt(req.params.id);
      const updatedCourse: CourseDTO =
        await this.courseService.removeTeacher(id);
      res.json(updatedCourse);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async changeStudentsCourse(
    req: Request,
    res: Response,
    del: boolean = false
  ): Promise<void> {
    try {
      const id: number = parseInt(req.params.id);
      const studentsId: CourseChangeStudentReqDTO = req.body;
      const response: CourseChangeStudentResDTO =
        await this.courseService.changeStudents(id, studentsId, del);
      res.json(response);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
