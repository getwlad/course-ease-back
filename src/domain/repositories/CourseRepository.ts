import { Course } from "../models";

export class CourseRepository {
  async findAll(): Promise<Course[]> {
    return Course.findAll();
  }

  async findById(id: number): Promise<Course> {
    const course = await Course.findByPk(id);

    if (!course) {
      throw new Error(`Curso com id: ${id} não encontrado.`);
    }

    return course;
  }

  async create(courseData: Partial<Course>): Promise<Course> {
    return Course.create(courseData);
  }

  async update(course: Course): Promise<Course> {
    await course.save();
    return course;
  }

  async delete(course: Course): Promise<Course> {
    course.active = false;
    await this.update(course);
    return course;
  }
}
