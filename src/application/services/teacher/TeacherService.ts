import { Teacher } from "../../../domain/models";
import { TeacherRepository } from "../../../domain/repositories/TeacherRepository";
import { TeacherDTO, mapTeacherToDTO } from "../../dto/teacher/TeacherDTO";
import { TeacherRequestDTO } from "../../dto/teacher/TeacherRequestDTO";
import {
  TeacherResponseDTO,
  mapTeacherToResponseDTO,
} from "../../dto/teacher/TeacherResponseDTO";

export class TeacherService {
  private teacherRepository: TeacherRepository;

  constructor() {
    this.teacherRepository = new TeacherRepository();
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
      throw new Error(`Teacher com id: ${id} não encontrado.`);
    }
    return teacher;
  }

  async createTeacher(
    teacherData: TeacherRequestDTO
  ): Promise<TeacherResponseDTO> {
    return this.convertToRespDTO(
      await this.teacherRepository.create(teacherData, teacherData.personData)
    );
  }

  async updateTeacher(
    id: number,
    teacherData: TeacherRequestDTO
  ): Promise<TeacherResponseDTO> {
    const teacher: Teacher = await this.findTeacherById(id);
    Object.assign(teacher, teacherData);
    Object.assign(teacher.person, teacherData.personData);
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
