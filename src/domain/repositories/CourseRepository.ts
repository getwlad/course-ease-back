import { Course, Person, Student, Teacher } from "../models";

export class CourseRepository {
  async findAll(): Promise<Course[]> {
    return Course.findAll({
      nest: true,
      include: [
        {
          model: Teacher,
          as: "teacher",
          include: [
            {
              model: Person,
              as: "person",
            },
          ],
        },
      ],
    });
  }

  async findById(id: number): Promise<Course | null> {
    return await Course.findByPk(id, {
      nest: true,
      include: [
        {
          model: Teacher,
          as: "teacher",
          include: [
            {
              model: Person,
              as: "person",
            },
          ],
        },
        {
          model: Student,
          as: "students",
          include: [
            {
              model: Person,
              as: "person",
            },
          ],
        },
      ],
    });
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

  async reloadModel(course: Course) {
    return await course.reload({
      raw: true,
      nest: true,
      include: [
        {
          model: Teacher,
          as: "teacher",
          include: [
            {
              model: Person,
              as: "person",
            },
          ],
        },
        {
          model: Student,
          as: "students",
          include: [
            {
              model: Person,
              as: "person",
            },
          ],
        },
      ],
    });
  }
}
