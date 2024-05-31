import { Student } from "../../../domain/models";

export interface StudentDTO {
  id: number;
  enrollment: string;
  name: string;
  active: boolean;
}

export function mapStudentToDTO(student: Student): StudentDTO {
  return {
    id: student.id,
    enrollment: student.enrollment,
    name: student.person.name,
    active: student.active,
  };
}
