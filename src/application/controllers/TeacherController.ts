import { Request, Response } from "express";
import { Person } from "../../domain/models/Person";
import { Teacher } from "../../domain/models/Teacher";
import { TeacherService } from "../services/TeacherService";

export class TeacherController {
  private teacherService: TeacherService;

  constructor() {
    this.teacherService = new TeacherService();
  }

  async getAllTeachers(req: Request, res: Response): Promise<void> {
    try {
      const teachers: Teacher[] = await this.teacherService.getAllTeachers();
      res.json(teachers);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getTeacherById(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id);
    try {
      const teacher: Teacher = await this.teacherService.getTeacherById(id);
      res.json(teacher);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createTeacher(req: Request, res: Response): Promise<void> {
    try {
      const teacherData: Partial<Teacher> = req.body.teacherData;
      const personData: Partial<Person> = req.body.personData;
      const teacher: Teacher = await this.teacherService.createTeacher(
        teacherData,
        personData
      );
      res.status(201).json(teacher);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateTeacher(req: Request, res: Response): Promise<void> {
    try {
      const teacher: Teacher = req.body;
      const updatedTeacher: Teacher =
        await this.teacherService.updateTeacher(teacher);
      res.json(updatedTeacher);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteTeacher(req: Request, res: Response): Promise<void> {
    try {
      const id: number = parseInt(req.params.id);
      const teacher: Teacher = await this.teacherService.getTeacherById(id);
      await this.teacherService.deleteTeacher(teacher);
      res.sendStatus(204);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
