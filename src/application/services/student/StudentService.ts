import { v4 as uuidv4 } from "uuid";
import { Student } from "../../../domain/models";
import { StudentRepository } from "../../../domain/repositories/StudentRepository";
import { StudentValidationService } from "../../../domain/services/StudentValidationService";
import { StudentDTO, mapStudentToDTO } from "../../dto/student/StudentDTO";
import { StudentRequestDTO } from "../../dto/student/StudentRequestDTO";
import {
  StudentResponseDTO,
  mapStudentToResponseDTO,
} from "../../dto/student/StudentResponseDTO";
import { CourseValidationService } from "../../../domain/services/CourseValidationService";
import { StudentUpdateDTO } from "../../dto/student/StudentUpdateDTO";
import { PersonService } from "../person/PersonService";

export class StudentService {
  private studentRepository: StudentRepository;
  private studentValidation: StudentValidationService;
  private courseValidationService: CourseValidationService;
  private personService: PersonService;
  constructor() {
    this.studentRepository = new StudentRepository();
    this.studentValidation = new StudentValidationService();
    this.courseValidationService = new CourseValidationService();
    this.personService = new PersonService();
  }

  getStudentRepository(): StudentRepository {
    return this.studentRepository;
  }

  async getAllStudents({ ...params }): Promise<StudentDTO[]> {
    return (await this.studentRepository.findAll({ ...params })).map(
      this.convertToDTO
    );
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
    await this.studentValidation.validateCreate(studentData);
    let enrollment = uuidv4();

    while (await this.studentRepository.existsByEnrollment(enrollment)) {
      enrollment = uuidv4();
    }

    if (studentData.courseId) {
      await this.courseValidationService.findCourseOrThrowEx(
        studentData.courseId
      );
    }

    return this.convertToRespDTO(
      await this.studentRepository.create(
        studentData,
        studentData.personData,
        enrollment
      )
    );
  }

  async updateStudent(
    id: number,
    studentData: StudentUpdateDTO
  ): Promise<StudentResponseDTO> {
    const student: Student = await this.findStudentById(id);
    if (student.person.phone != studentData.personData.phone) {
      await this.studentValidation.validatePhone(studentData.personData.phone);
    }
    if (student.person.email != studentData.personData.email) {
      await this.studentValidation.validateEmail(studentData.personData.email);
    }
    Object.assign(student, studentData);
    Object.assign(student.person, studentData.personData);
    await this.personService.updatePerson(student.person);
    return this.convertToRespDTO(await this.studentRepository.update(student));
  }

  async deleteStudent(id: number): Promise<void> {
    const student: Student = await this.findStudentById(id);
    await this.studentRepository.delete(student);
  }

  private convertToRespDTO(student: Student): StudentResponseDTO {
    return mapStudentToResponseDTO(student);
  }
  private convertToDTO(student: Student): StudentDTO {
    return mapStudentToDTO(student);
  }
}
