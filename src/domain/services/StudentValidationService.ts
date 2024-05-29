import { StudentRepository } from "../repositories/StudentRepository";

export class StudentValidationService {
  private studentRepository: StudentRepository;

  constructor() {
    this.studentRepository = new StudentRepository();
  }
  async validateCPFRegistered(cpf: string): Promise<void> {
    if (await this.studentRepository.existsByCPF(cpf)) {
      throw new Error(`CPF informado já cadastrado.`);
    }
  }
}
