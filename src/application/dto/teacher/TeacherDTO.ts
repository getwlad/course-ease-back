import { Teacher } from "../../../domain/models";

export interface TeacherDTO {
  id: number;
  specialization: string;
  experienceYears: number;
  name: string;
  active: boolean;
}

export function mapTeacherToDTO(teacher: Teacher): TeacherDTO {
  return {
    id: teacher.id,
    specialization: teacher.specialization,
    experienceYears: teacher.experienceYears,
    name: teacher.person.name,
    active: teacher.active,
  };
}
