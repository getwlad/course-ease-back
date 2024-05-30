import { Transaction } from "sequelize";
import { Course, Student, Teacher } from "../../../domain/models";
import { CourseRepository } from "../../../domain/repositories/CourseRepository";
import {
  CourseAddStudentReqDTO,
  CourseAddStudentResDTO,
} from "../../dto/course/CourseAddStudentReqDTO";
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
    course.teacher = teacher;
    return this.convertToDTO(await this.courseRepository.update(course));
  }

  async addStudents(
    id: number,
    students: CourseAddStudentReqDTO
  ): Promise<CourseAddStudentResDTO> {
    const addedStudents: number[] = [];
    const notAddedStudents: number[] = [];
    const course: Course = await this.findCourseById(id);
    const transaction: Transaction = await sequelize.transaction();
    try {
      for (const studentId of students.studentIds) {
        const student: Student | null = await this.studentService
          .getStudentRepository()
          .findById(studentId, transaction);

        if (!student || student?.courseId != null) {
          notAddedStudents.push(studentId);
          continue;
        }

        student.courseId = id;
        await this.studentService
          .getStudentRepository()
          .update(student, transaction);

        addedStudents.push(studentId);
      }
      await transaction.commit();

      await this.courseRepository.update(course);

      return {
        courseId: course.id,
        course: course.name,
        addedStudents,
        notAddedStudents,
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
}
