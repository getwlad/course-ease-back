import { TeacherRepository } from "../repositories/TeacherRepository";

export class StudentValidationService {
  private techerRepository: TeacherRepository;

  constructor() {
    this.techerRepository = new TeacherRepository();
  }
  async validateCPFRegistered(cpf: string): Promise<void> {
    if (await this.techerRepository.existsByCPF(cpf)) {
      throw new Error(`CPF informado já cadastrado.`);
    }
  }
}
