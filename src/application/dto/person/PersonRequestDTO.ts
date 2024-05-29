export interface PersonRequestDTO {
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: "masculino" | "feminino" | "outros";
}
