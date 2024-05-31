import { PersonRequestDTO } from "../../application/dto/person/PersonRequestDTO";
import { PersonRepository } from "../repositories/PersonRepository";

export class PersonValidationService {
  private personRepository: PersonRepository;

  constructor() {
    this.personRepository = new PersonRepository();
  }
  async validateAll(person: PersonRequestDTO) {
    await this.validateEmailRegistered(person.email);
    await this.validatePhoneRegistered(person.phone);
  }
  async validateEmailRegistered(email: string): Promise<void> {
    if (await this.personRepository.existsByEmail(email)) {
      throw new Error(`Email já cadastrado.`);
    }
  }
  async validatePhoneRegistered(phone: string): Promise<void> {
    if (await this.personRepository.existsByPhone(phone)) {
      throw new Error(`Telefone já cadastrado.`);
    }
  }
}
