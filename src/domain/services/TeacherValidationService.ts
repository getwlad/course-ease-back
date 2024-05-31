import { TeacherRequestDTO } from "../../application/dto/teacher/TeacherRequestDTO";
import { TeacherRepository } from "../repositories/TeacherRepository";
import { PersonValidationService } from "./PersonValidationService";

export class TeacherValidationService {
  private techerRepository: TeacherRepository;
  private personValidation: PersonValidationService;

  constructor() {
    this.techerRepository = new TeacherRepository();
    this.personValidation = new PersonValidationService();
  }
  async validateCreate(teacherCreate: TeacherRequestDTO) {
    await this.validateCPFRegistered(teacherCreate.cpfCnpj);
    await this.validateCNPJRegistered(teacherCreate.cpfCnpj);
    await this.personValidation.validateAll(teacherCreate.personData);
  }
  async validateCPFRegistered(cpf: string): Promise<void> {
    if (await this.techerRepository.existsByCPF(cpf)) {
      throw new Error(`CPF informado já cadastrado.`);
    }
  }
  async validateCNPJRegistered(cnpj: string): Promise<void> {
    if (await this.techerRepository.existsByCNPJ(cnpj)) {
      throw new Error(`CNPJ informado já cadastrado.`);
    }
  }
  async validatePhone(phone: string): Promise<void> {
    await this.personValidation.validatePhoneRegistered(phone);
  }
  async validateEmail(email: string): Promise<void> {
    await this.personValidation.validateEmailRegistered(email);
  }
}
