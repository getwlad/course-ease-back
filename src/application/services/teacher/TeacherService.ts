import { Teacher } from "../../../domain/models";
import { TeacherRepository } from "../../../domain/repositories/TeacherRepository";
import { CourseValidationService } from "../../../domain/services/CourseValidationService";
import { TeacherValidationService } from "../../../domain/services/TeacherValidationService";
import { TeacherDTO, mapTeacherToDTO } from "../../dto/teacher/TeacherDTO";
import { TeacherRequestDTO } from "../../dto/teacher/TeacherRequestDTO";
import {
  TeacherResponseDTO,
  mapTeacherToResponseDTO,
} from "../../dto/teacher/TeacherResponseDTO";
import { TeacherUpdateDTO } from "../../dto/teacher/TeacherUpdateDTO";

export class TeacherService {
  private teacherRepository: TeacherRepository;
  private courseValidationService: CourseValidationService;
  private teacherValidation: TeacherValidationService;

  constructor() {
    this.teacherRepository = new TeacherRepository();
    this.courseValidationService = new CourseValidationService();
    this.teacherValidation = new TeacherValidationService();
  }

  async getAllTeachers(): Promise<TeacherDTO[]> {
    return (await this.teacherRepository.findAll()).map(this.convertToDTO);
  }
  async getTeacherById(id: number): Promise<TeacherResponseDTO> {
    const teacher: Teacher = await this.findTeacherById(id);
    return this.convertToRespDTO(teacher);
  }

  async findTeacherById(id: number): Promise<Teacher> {
    const teacher: Teacher | null = await this.teacherRepository.findById(id);
    if (!teacher) {
      throw new Error(`Professor com id: ${id} não encontrado.`);
    }
    return teacher;
  }

  async createTeacher(
    teacherData: TeacherRequestDTO
  ): Promise<TeacherResponseDTO> {
    if (teacherData.courseId) {
      await this.courseValidationService.findCourseOrThrowEx(
        teacherData.courseId
      );
    }
    await this.teacherValidation.validateCreate(teacherData);
    return this.convertToRespDTO(
      await this.teacherRepository.create(teacherData, teacherData.personData)
    );
  }

  async updateTeacher(
    id: number,
    teacherData: TeacherUpdateDTO
  ): Promise<TeacherResponseDTO> {
    const teacher: Teacher = await this.findTeacherById(id);
    if (teacher.person.phone != teacherData.personData.phone) {
      await this.teacherValidation.validatePhone(teacherData.personData.phone);
    }
    if (teacher.person.email != teacherData.personData.email) {
      await this.teacherValidation.validateEmail(teacherData.personData.email);
    }
    Object.assign(teacher, teacherData);
    Object.assign(teacher.person, teacherData.personData);
    return this.update(teacher);
  }

  async update(teacher: Teacher): Promise<TeacherResponseDTO> {
    return this.convertToRespDTO(await this.teacherRepository.update(teacher));
  }

  async deleteTeacher(id: number): Promise<void> {
    const teacher: Teacher = await this.findTeacherById(id);
    return this.teacherRepository.delete(teacher);
  }

  private convertToRespDTO(teacher: Teacher): TeacherResponseDTO {
    return mapTeacherToResponseDTO(teacher);
  }
  private convertToDTO(teacher: Teacher): TeacherDTO {
    return mapTeacherToDTO(teacher);
  }
}
