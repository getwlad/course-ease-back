import { UserRepository } from "../repositories/UserRepository";

export class RegisterValidationService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }
  async validateUsernameRegistered(username: string): Promise<void> {
    if (await this.userRepository.existsByUsername(username)) {
      throw new Error(`Usuário já cadastrado.`);
    }
  }
}
