import { StudentRequestDTO } from "../../application/dto/student/StudentRequestDTO";
import { StudentRepository } from "../repositories/StudentRepository";
import { PersonValidationService } from "./PersonValidationService";

export class StudentValidationService {
  private studentRepository: StudentRepository;
  private personValidation: PersonValidationService;

  constructor() {
    this.studentRepository = new StudentRepository();
    this.personValidation = new PersonValidationService();
  }
  async validateCreate(studentCreate: StudentRequestDTO) {
    await this.validateCPFRegistered(studentCreate.cpf);
    await this.personValidation.validateAll(studentCreate.personData);
  }
  async validateCPFRegistered(cpf: string): Promise<void> {
    if (await this.studentRepository.existsByCPF(cpf)) {
      throw new Error(`CPF informado já cadastrado.`);
    }
  }
  async validatePhone(phone: string): Promise<void> {
    await this.personValidation.validatePhoneRegistered(phone);
  }
  async validateEmail(email: string): Promise<void> {
    await this.personValidation.validateEmailRegistered(email);
  }
}
