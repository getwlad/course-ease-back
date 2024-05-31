import { PersonRequestDTO } from "../person/PersonRequestDTO";

export interface TeacherUpdateDTO {
  specialization: string;
  experienceYears: number;
  active: boolean;
  personData: PersonRequestDTO;
}
