import { Request, Response } from "express";
import { Person } from "../../domain/models/Person";
import { Student } from "../../domain/models/Student";
import { StudentService } from "../services/StudentService";

export class StudentController {
  private studentService: StudentService;

  constructor() {
    this.studentService = new StudentService();
  }

  async getAllStudents(req: Request, res: Response): Promise<void> {
    try {
      const students: Student[] = await this.studentService.getAllStudents();
      res.json(students);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getStudentById(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id);
    try {
      const student: Student = await this.studentService.getStudentById(id);
      res.json(student);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createStudent(req: Request, res: Response): Promise<void> {
    try {
      const studentData: Partial<Student> = req.body.studentData;
      const personData: Partial<Person> = req.body.personData;
      const student: Student = await this.studentService.createStudent(
        studentData,
        personData
      );
      res.status(201).json(student);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateStudent(req: Request, res: Response): Promise<void> {
    try {
      const student: Student = req.body;
      const updatedStudent: Student =
        await this.studentService.updateStudent(student);
      res.json(updatedStudent);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteStudent(req: Request, res: Response): Promise<void> {
    try {
      const id: number = parseInt(req.params.id);
      const student: Student = await this.studentService.getStudentById(id);
      await this.studentService.deleteStudent(student);
      res.sendStatus(204);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
