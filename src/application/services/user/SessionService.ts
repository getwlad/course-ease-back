import bcrypt from "bcrypt";
import { UserService } from "./UserService";
import TokenService from "../../../domain/services/TokenService";
import { UserRequestDTO } from "../../dto/user/UserRequestDTO";
import { UserResponseDTO } from "../../dto/user/UserResponseDTO";

class SessionService {
  private userService: UserService;
  private tokenService: TokenService;

  constructor() {
    this.userService = new UserService();
    this.tokenService = new TokenService();
  }

  async authenticate(username: string, password: string) {
    const user = await this.userService.findByUsername(username);

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Senha incorreta");
    }

    const token = this.tokenService.generateToken(user.id);

    return { user: username, token };
  }

  async createUser(userData: UserRequestDTO): Promise<UserResponseDTO> {
    return await this.userService.createUser(userData);
  }
}

export default SessionService;
