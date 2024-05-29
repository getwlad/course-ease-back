import { PersonRepository } from "../repositories/PersonRepository";
import { UserRepository } from "../repositories/UserRepository";

export class PersonValidationService {
  private personRepository: PersonRepository;

  constructor() {
    this.personRepository = new PersonRepository();
  }
  async validateUsernameRegistered(username: string): Promise<void> {
    if (await this.userRepository.existsByUsername(username)) {
      throw new Error(`Usuário já cadastrado.`);
    }
  }
}
