import { Course } from "../../../domain/models";
import { StudentDTO, mapStudentToDTO } from "../student/StudentDTO";
import { TeacherDTO, mapTeacherToDTO } from "../teacher/TeacherDTO";

export interface CourseResponseDTO {
  id: number;
  name: string;
  category: string;
  active: boolean;
  description: string;
  teacher: TeacherDTO | null;
  students: StudentDTO[];
}

export function mapCourseToResponseDTO(course: Course): CourseResponseDTO {
  return {
    id: course.id,
    name: course.name,
    category: course.category,
    active: course.active,
    description: course.description,
    teacher: course.teacher?.id ? mapTeacherToDTO(course.teacher) : null,
    students:
      course.students?.length > 0 ? course.students.map(mapStudentToDTO) : [],
  };
}
