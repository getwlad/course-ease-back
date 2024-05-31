import { Request, Response } from "express";
import { StudentService } from "../services/student/StudentService";
import { StudentDTO } from "../dto/student/StudentDTO";
import { StudentResponseDTO } from "../dto/student/StudentResponseDTO";
import { StudentRequestDTO } from "../dto/student/StudentRequestDTO";
import { StudentUpdateDTO } from "../dto/student/StudentUpdateDTO";

export class StudentController {
  private studentService: StudentService;

  constructor() {
    this.studentService = new StudentService();
  }

  async getAllStudents(req: Request, res: Response): Promise<void> {
    try {
      const students: StudentDTO[] = await this.studentService.getAllStudents();
      res.json(students);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getStudentById(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id);
    try {
      const student: StudentResponseDTO =
        await this.studentService.getStudentById(id);
      res.json(student);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createStudent(req: Request, res: Response): Promise<void> {
    try {
      const studentData: StudentRequestDTO = req.body;
      const student: StudentResponseDTO =
        await this.studentService.createStudent(studentData);
      res.status(201).json(student);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateStudent(req: Request, res: Response): Promise<void> {
    try {
      const id: number = parseInt(req.params.id);
      const student: StudentUpdateDTO = req.body;
      const updatedStudent: StudentResponseDTO =
        await this.studentService.updateStudent(id, student);
      res.json(updatedStudent);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteStudent(req: Request, res: Response): Promise<void> {
    try {
      const id: number = parseInt(req.params.id);
      await this.studentService.deleteStudent(id);
      res.sendStatus(200);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
