import { Teacher } from "../../../domain/models";
import { CourseDTO, mapCourseToDTO } from "../course/CourseDTO";
import {
  PersonResponseDTO,
  mapPersonToResponseDTO,
} from "../person/PersonResponseDTO";

export interface TeacherResponseDTO {
  id: number;
  cpfCnpj: string;
  specialization: string;
  experienceYears: number;
  course: CourseDTO | null;
  personData: PersonResponseDTO;
}

export function mapTeacherToResponseDTO(teacher: Teacher): TeacherResponseDTO {
  return {
    id: teacher.id,
    cpfCnpj: teacher.cpfCnpj,
    specialization: teacher.specialization,
    experienceYears: teacher.experienceYears,
    course: teacher.course?.id ? mapCourseToDTO(teacher.course) : null,
    personData: mapPersonToResponseDTO(teacher.person),
  };
}
