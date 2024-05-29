import { Person } from "../../domain/models/Person";
import { Teacher } from "../../domain/models/Teacher";
import { TeacherRepository } from "../../domain/repositories/TeacherRepository";

export class TeacherService {
  private teacherRepository: TeacherRepository;

  constructor() {
    this.teacherRepository = new TeacherRepository();
  }

  async getAllTeachers(): Promise<Teacher[]> {
    return this.teacherRepository.findAll();
  }

  async getTeacherById(id: number): Promise<Teacher> {
    return this.teacherRepository.findById(id);
  }

  async createTeacher(
    teacherData: Partial<Teacher>,
    personData: Partial<Person>
  ): Promise<Teacher> {
    return this.teacherRepository.create(teacherData, personData);
  }

  async updateTeacher(teacher: Teacher): Promise<Teacher> {
    return this.teacherRepository.update(teacher);
  }

  async deleteTeacher(teacher: Teacher): Promise<void> {
    return this.teacherRepository.delete(teacher);
  }
}
