import { Transaction } from "sequelize";
import { Course, Student, Teacher } from "../../../domain/models";
import { CourseRepository } from "../../../domain/repositories/CourseRepository";
import {
  CourseChangeStudentResDTO,
  CourseChangeStudentReqDTO,
} from "../../dto/course/CourseChangeStudentDTO";
import { CourseDTO, mapCourseToDTO } from "../../dto/course/CourseDTO";
import { CourseRequestDTO } from "../../dto/course/CourseRequestDTO";
import sequelize from "../../../infrastructure/database/sequelize";
import {
  CourseResponseDTO,
  mapCourseToResponseDTO,
} from "../../dto/course/CourseResponseDTO";
import { StudentService } from "../student/StudentService";
import { TeacherService } from "../teacher/TeacherService";

export class CourseService {
  private courseRepository: CourseRepository;
  private teacherService: TeacherService;
  private studentService: StudentService;

  constructor() {
    this.courseRepository = new CourseRepository();
    this.teacherService = new TeacherService();
    this.studentService = new StudentService();
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

  async updateTeacher(id: number, teacherId: number): Promise<CourseDTO> {
    const course: Course = await this.findCourseById(id);
    const teacher: Teacher =
      await this.teacherService.findTeacherById(teacherId);
    if (teacher.course != null) {
      throw new Error("O professor já está registrado em um curso.");
    }
    teacher.courseId = course.id;
    await this.teacherService.update(teacher);
    return this.convertToDTO(await this.courseRepository.update(course));
  }

  async removeTeacher(id: number): Promise<CourseDTO> {
    const course: Course = await this.findCourseById(id);
    if (course.teacher == null) {
      throw new Error("O curso não tem um professor registrado");
    }
    course.teacher.courseId = null;
    await this.teacherService.update(course.teacher);
    return this.convertToDTO(await this.courseRepository.update(course));
  }

  async changeStudents(
    id: number,
    { studentIds }: CourseChangeStudentReqDTO,
    del: boolean
  ): Promise<CourseChangeStudentResDTO> {
    const success: number[] = [];
    const failed: number[] = [];
    const course: Course = await this.findCourseById(id);

    const transaction: Transaction = await sequelize.transaction();
    try {
      const studentRepository = this.studentService.getStudentRepository();

      await Promise.all(
        studentIds.map((studentId) =>
          this.processStudent(
            studentId,
            id,
            del,
            studentRepository,
            success,
            failed,
            transaction
          )
        )
      );

      await transaction.commit();
      await this.courseRepository.update(course);

      return {
        courseId: course.id,
        course: course.name,
        success,
        failed,
      };
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }

  private convertToRespDTO(course: Course): CourseResponseDTO {
    return mapCourseToResponseDTO(course);
  }
  private convertToDTO(course: Course): CourseDTO {
    return mapCourseToDTO(course);
  }

  private async processStudent(
    studentId: number,
    courseId: number,
    del: boolean,
    studentRepository: any,
    success: number[],
    failed: number[],
    transaction: Transaction
  ) {
    try {
      const student: Student | null = await studentRepository.findById(
        studentId,
        transaction
      );

      if (
        !student ||
        (!del && student.courseId != null) ||
        (del && student.courseId == null)
      ) {
        failed.push(studentId);
      } else {
        student.courseId = del ? null : courseId;
        await studentRepository.update(student, transaction);
        success.push(studentId);
      }
    } catch (error: any) {
      console.error(
        `Falha ao adicionar/remover estudante: ${studentId}: ${error.message}`
      );
      failed.push(studentId);
    }
  }
}
