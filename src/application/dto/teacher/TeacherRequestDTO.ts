import { PersonRequestDTO } from "../person/PersonRequestDTO";

export interface TeacherRequestDTO {
  cpfCnpj: string;
  specialization: string;
  experienceYears: number;
  courseId: number;
  personData: PersonRequestDTO;
}
