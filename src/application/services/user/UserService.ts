import { User } from "../../../domain/models";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { UserRequestDTO } from "../../dto/user/UserRequestDTO";
import {
  UserResponseDTO,
  mapUserToRespDTO,
} from "../../dto/user/UserResponseDTO";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers(): Promise<UserResponseDTO[]> {
    return (await this.userRepository.findAll()).map(this.convertToDTO);
  }

  async getUserById(id: number): Promise<UserResponseDTO> {
    const user: User = await this.findUserrById(id);
    return this.convertToDTO(user);
  }

  async findUserrById(id: number): Promise<User> {
    const user: User | null = await this.userRepository.findById(id);
    if (!user) {
      throw new Error(`Usuário com id: ${id} não encontrado.`);
    }
    return user;
  }

  async createUser(userData: Partial<User>): Promise<UserResponseDTO> {
    return this.userRepository.create(userData);
  }

  async updateUser(
    id: number,
    userData: UserRequestDTO
  ): Promise<UserResponseDTO> {
    const user: User = await this.findUserrById(id);
    Object.assign(user, userData);
    return this.convertToDTO(await this.userRepository.update(user));
  }

  async softDeleteUser(id: number): Promise<UserResponseDTO> {
    const user: User = await this.findUserrById(id);
    user.active = false;
    return this.convertToDTO(await this.userRepository.update(user));
  }

  private convertToDTO(user: User): UserResponseDTO {
    return mapUserToRespDTO(user);
  }
}
