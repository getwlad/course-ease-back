import { Course, Teacher } from "../../../domain/models";
import { CourseRepository } from "../../../domain/repositories/CourseRepository";
import { CourseDTO, mapCourseToDTO } from "../../dto/course/CourseDTO";
import { CourseRequestDTO } from "../../dto/course/CourseRequestDTO";
import {
  CourseResponseDTO,
  mapCourseToResponseDTO,
} from "../../dto/course/CourseResponseDTO";

export class CourseService {
  private courseRepository: CourseRepository;

  constructor() {
    this.courseRepository = new CourseRepository();
  }

  async getAllCourses(): Promise<CourseDTO[]> {
    return (await this.courseRepository.findAll()).map(this.convertToDTO);
  }

  async getCourseById(id: number): Promise<CourseResponseDTO> {
    const course: Course = await this.findCourseById(id);
    return this.convertToRespDTO(course);
  }

  async findCourseById(id: number): Promise<Course> {
    const course: Course | null = await this.courseRepository.findById(id);
    if (!course) {
      throw new Error(`Curso com id: ${id} não encontrado.`);
    }
    return course;
  }

  async createCourse(courseData: CourseRequestDTO): Promise<CourseResponseDTO> {
    const course: Course = await this.courseRepository.create(courseData);
    return this.convertToRespDTO(course);
  }

  async updateCourse(
    id: number,
    courseData: CourseRequestDTO
  ): Promise<CourseDTO> {
    const course: Course = await this.findCourseById(id);
    course.name = courseData.name;
    course.category = courseData.category;
    course.active = courseData.active;
    course.description = courseData.description;
    await this.courseRepository.update(course);
    return this.convertToDTO(course);
  }

  async softDeleteCourse(id: number): Promise<void> {
    const course: Course = await this.findCourseById(id);
    course.active = false;
  }

  private convertToRespDTO(course: Course): CourseResponseDTO {
    return mapCourseToResponseDTO(course);
  }
  private convertToDTO(course: Course): CourseDTO {
    return mapCourseToDTO(course);
  }
}
