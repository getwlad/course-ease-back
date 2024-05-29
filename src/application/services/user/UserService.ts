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
    const user: User = await this.findUserById(id);
    return this.convertToDTO(user);
  }

  async findUserById(id: number): Promise<User> {
    const user: User | null = await this.userRepository.findById(id);
    if (!user) {
      throw new Error(`Usuário com id: ${id} não encontrado.`);
    }
    return user;
  }

  async createUser(userData: Partial<User>): Promise<UserResponseDTO> {
    userData.active = true;
    return this.convertToDTO(await this.userRepository.create(userData));
  }

  async updateUser(
    id: number,
    userData: UserRequestDTO
  ): Promise<UserResponseDTO> {
    const user: User = await this.findUserById(id);
    Object.assign(user, userData);
    return this.convertToDTO(await this.userRepository.update(user));
  }

  async softDeleteUser(id: number): Promise<UserResponseDTO> {
    const user: User = await this.findUserById(id);
    user.active = false;
    return this.convertToDTO(await this.userRepository.update(user));
  }

  private convertToDTO(user: User): UserResponseDTO {
    return mapUserToRespDTO(user);
  }

  async findByUsername(username: string): Promise<User> {
    const user: User | null =
      await this.userRepository.findByUsername(username);
    if (!user || !user.active) {
      throw new Error(`Usuário não cadastrado ou desativado.`);
    }
    return user;
  }
}
