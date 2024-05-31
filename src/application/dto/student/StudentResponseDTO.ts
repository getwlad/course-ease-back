import { Student } from "../../../domain/models";
import { CourseDTO, mapCourseToDTO } from "../course/CourseDTO";
import {
  PersonResponseDTO,
  mapPersonToResponseDTO,
} from "../person/PersonResponseDTO";

export interface StudentResponseDTO {
  id: number;
  cpf: string;
  enrollment: string;
  course: CourseDTO | null;
  active: boolean;
  personData: PersonResponseDTO;
}

export function mapStudentToResponseDTO(student: Student): StudentResponseDTO {
  return {
    id: student.id,
    cpf: student.cpf,
    enrollment: student.enrollment,
    course: student.course?.id ? mapCourseToDTO(student.course) : null,
    active: student.active,
    personData: mapPersonToResponseDTO(student.person),
  };
}
