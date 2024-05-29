import { Person } from "../../domain/models/Person";
import { Student } from "../../domain/models/Student";
import { StudentRepository } from "../../domain/repositories/StudentRepository";

export class StudentService {
  private studentRepository: StudentRepository;

  constructor() {
    this.studentRepository = new StudentRepository();
  }

  async getAllStudents(): Promise<Student[]> {
    return this.studentRepository.findAll();
  }

  async getStudentById(id: number): Promise<Student> {
    return this.studentRepository.findById(id);
  }

  async createStudent(
    studentData: Partial<Student>,
    personData: Partial<Person>
  ): Promise<Student> {
    return this.studentRepository.create(studentData, personData);
  }

  async updateStudent(student: Student): Promise<Student> {
    return this.studentRepository.update(student);
  }

  async deleteStudent(student: Student): Promise<void> {
    return this.studentRepository.delete(student);
  }
}
