import { PersonRequestDTO } from "../person/PersonRequestDTO";

export interface StudentUpdateDTO {
  active: boolean;
  personData: PersonRequestDTO;
}
