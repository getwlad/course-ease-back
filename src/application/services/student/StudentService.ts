import { Person } from "../../../domain/models";
import { Student } from "../../../domain/models";
import { StudentRepository } from "../../../domain/repositories/StudentRepository";
import { StudentDTO, mapStudentToDTO } from "../../dto/student/StudentDTO";
import { StudentRequestDTO } from "../../dto/student/StudentRequestDTO";
import {
  StudentResponseDTO,
  mapStudentToResponseDTO,
} from "../../dto/student/StudentResponseDTO";

export class StudentService {
  private studentRepository: StudentRepository;

  constructor() {
    this.studentRepository = new StudentRepository();
  }

  async getAllStudents(): Promise<StudentDTO[]> {
    return (await this.studentRepository.findAll()).map(this.convertToDTO);
  }

  async findStudentById(id: number): Promise<Student> {
    const student: Student | null = await this.studentRepository.findById(id);
    if (!student) {
      throw new Error(`Estudante com id: ${id} não encontrado.`);
    }
    return student;
  }

  async getStudentById(id: number): Promise<StudentResponseDTO> {
    const student: Student = await this.findStudentById(id);
    return this.convertToRespDTO(student);
  }

  async createStudent(
    studentData: StudentRequestDTO
  ): Promise<StudentResponseDTO> {
    return this.convertToRespDTO(
      await this.studentRepository.create(studentData, studentData.personData)
    );
  }

  async updateStudent(
    id: number,
    studentData: StudentRequestDTO
  ): Promise<StudentResponseDTO> {
    const student: Student = await this.findStudentById(id);
    Object.assign(student, studentData);
    Object.assign(student.person, studentData.personData);
    return this.convertToRespDTO(await this.studentRepository.update(student));
  }

  async deleteStudent(id: number): Promise<void> {
    const student: Student = await this.findStudentById(id);
    return await this.studentRepository.delete(student);
  }

  private convertToRespDTO(student: Student): StudentResponseDTO {
    return mapStudentToResponseDTO(student);
  }
  private convertToDTO(student: Student): StudentDTO {
    return mapStudentToDTO(student);
  }
}
