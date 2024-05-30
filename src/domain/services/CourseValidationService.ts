import { CourseService } from "../../application/services/course/CourseService";

export class CourseValidationService {
  private courseService: CourseService;
  constructor() {
    this.courseService = new CourseService();
  }
  async findCourseOrThrowEx(id: number): Promise<void> {
    await this.courseService.findCourseById(id);
  }
}
