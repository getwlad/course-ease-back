import { Course } from "../../../domain/models";
import { StudentDTO, mapStudentToDTO } from "../student/StudentDTO";
import { TeacherDTO, mapTeacherToDTO } from "../teacher/TeacherDTO";

export interface CourseResponseDTO {
  id: number;
  name: string;
  category: string;
  active: boolean;
  description: string;
  teacher: TeacherDTO;
  students: StudentDTO[];
}

export function mapCourseToResponseDTO(course: Course): CourseResponseDTO {
  return {
    id: course.id,
    name: course.name,
    category: course.category,
    active: course.active,
    description: course.description,
    teacher: mapTeacherToDTO(course.teacher),
    students: course.students.map(mapStudentToDTO),
  };
}
