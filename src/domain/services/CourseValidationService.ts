import { Course } from "../models";
import { CourseRepository } from "../repositories/CourseRepository";

export class CourseValidationService {
  private courseRepository: CourseRepository;
  constructor() {
    this.courseRepository = new CourseRepository();
  }
  async findCourseOrThrowEx(id: number): Promise<void> {
    const course: Course | null = await this.courseRepository.findById(id);
    if (!course) {
      throw new Error(`Curso com id: ${id} não encontrado.`);
    }
  }
}
