import { PersonRequestDTO } from "../person/PersonRequestDTO";

export interface TeacherUpdateDTO {
  specialization: string;
  experienceYears: number;
  personData: PersonRequestDTO;
}
