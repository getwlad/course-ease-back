import { PersonRequestDTO } from "../person/PersonRequestDTO";

export interface StudentRequestDTO {
  cpf: string;
  enrollment: string;
  courseId: number;
  personData: PersonRequestDTO;
}
