import { Person } from "../../../domain/models";

export interface PersonResponseDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: "masculino" | "feminino" | "outros";
}

export function mapPersonToResponseDTO(person: Person): PersonResponseDTO {
  return {
    id: person.id,
    name: person.name,
    email: person.email,
    phone: person.phone,
    birthDate: person.birthDate,
    gender: person.gender,
  };
}
