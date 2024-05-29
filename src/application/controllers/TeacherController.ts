import { Request, Response } from "express";
import { TeacherService } from "../services/teacher/TeacherService";
import { TeacherDTO } from "../dto/teacher/TeacherDTO";
import { TeacherResponseDTO } from "../dto/teacher/TeacherResponseDTO";
import { TeacherRequestDTO } from "../dto/teacher/TeacherRequestDTO";

export class TeacherController {
  private teacherService: TeacherService;

  constructor() {
    this.teacherService = new TeacherService();
  }

  async getAllTeachers(req: Request, res: Response): Promise<void> {
    try {
      const teachers: TeacherDTO[] = await this.teacherService.getAllTeachers();
      res.json(teachers);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getTeacherById(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id);
    try {
      const teacher: TeacherResponseDTO =
        await this.teacherService.getTeacherById(id);
      res.json(teacher);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createTeacher(req: Request, res: Response): Promise<void> {
    try {
      const teacherData: TeacherRequestDTO = req.body;
      const teacher: TeacherResponseDTO =
        await this.teacherService.createTeacher(teacherData);
      res.status(201).json(teacher);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateTeacher(req: Request, res: Response): Promise<void> {
    try {
      const id: number = parseInt(req.params.id);
      const teacher: TeacherRequestDTO = req.body;
      const updatedTeacher: TeacherResponseDTO =
        await this.teacherService.updateTeacher(id, teacher);
      res.json(updatedTeacher);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteTeacher(req: Request, res: Response): Promise<void> {
    try {
      const id: number = parseInt(req.params.id);
      await this.teacherService.deleteTeacher(id);
      res.sendStatus(204);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
