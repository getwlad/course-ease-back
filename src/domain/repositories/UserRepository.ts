import { User } from "../models";

export class UserRepository {
  async findAll(): Promise<User[]> {
    return User.findAll();
  }

  async findById(id: number): Promise<User | null> {
    const user = await User.findByPk(id);
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

  async findByUsername(username: string): Promise<User | null> {
    const user = await User.findOne({ where: { username } });
    return user;
  }

  async existsByUsername(username: string): Promise<boolean> {
    return (await this.findByUsername(username)) !== null;
  }
}
