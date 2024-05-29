import { Course } from "../../domain/models/Course";
import { CourseRepository } from "../../domain/repositories/CourseRepository";

export class CourseService {
  private courseRepository: CourseRepository;

  constructor() {
    this.courseRepository = new CourseRepository();
  }

  async getAllCourses(): Promise<Course[]> {
    return this.courseRepository.findAll();
  }

  async getCourseById(id: number): Promise<Course> {
    return this.courseRepository.findById(id);
  }

  async createCourse(courseData: Partial<Course>): Promise<Course> {
    return this.courseRepository.create(courseData);
  }

  async updateCourse(course: Course): Promise<Course> {
    return this.courseRepository.update(course);
  }

  async softDeleteCourse(course: Course): Promise<Course> {
    course.active = false;
    return this.courseRepository.update(course);
  }
}
