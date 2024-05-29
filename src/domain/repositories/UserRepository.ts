import { User } from "../models";

export class UserRepository {
  async findAll(): Promise<User[]> {
    return User.findAll();
  }

  async findById(id: number): Promise<User> {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error(`Usuário com id: ${id} não encontrado.`);
    }

    return user;
  }

  async create(userData: Partial<User>): Promise<User> {
    return User.create(userData);
  }

  async update(user: User): Promise<User> {
    await user.save();
    return user;
  }

  async delete(user: User): Promise<User> {
    user.active = false;
    await this.update(user);
    return user;
  }
}
