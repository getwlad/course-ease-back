import { User } from "../../domain/models/User";
import { UserRepository } from "../../domain/repositories/UserRepository";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.findById(id);
  }

  async createUser(userData: Partial<User>): Promise<User> {
    return this.userRepository.create(userData);
  }

  async updateUser(user: User): Promise<User> {
    return this.userRepository.update(user);
  }

  async softDeleteUser(user: User): Promise<User> {
    user.active = false;
    return this.userRepository.update(user);
  }
}
