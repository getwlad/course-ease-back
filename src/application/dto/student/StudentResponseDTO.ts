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
  course: CourseDTO;
  personData: PersonResponseDTO;
}

export function mapStudentToResponseDTO(student: Student): StudentResponseDTO {
  return {
    id: student.id,
    cpf: student.cpf,
    enrollment: student.enrollment,
    course: mapCourseToDTO(student.course),
    personData: mapPersonToResponseDTO(student.person),
  };
}
